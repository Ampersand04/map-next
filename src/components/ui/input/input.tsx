import React, { useState, ForwardRefExoticComponent, RefAttributes } from 'react';
import styles from './input.module.scss';
import { classNames } from '@/utils/combineClasses';
import Image from 'next/image';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    type: string;
    value?: string; // Значение может быть необязательным, но не должно быть undefined
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    intent?: 'default' | 'filled' | 'error';
    inputSize?: 'medium';
    label?: string;
    placeholder?: string;
    autoFocus?: boolean;
    errorMessage?: string; // Проп для отображения сообщения об ошибке
}

const Input: ForwardRefExoticComponent<InputProps & RefAttributes<HTMLInputElement>> =
    React.forwardRef<
        HTMLInputElement, // Тип рефа
        InputProps // Тип пропсов
    >(
        (
            {
                id,
                type,
                value = '', // Устанавливаем значение по умолчанию, чтобы избежать undefined
                intent = 'default',
                inputSize = 'medium',
                label,
                placeholder = '',
                className,
                errorMessage,
                onChange,
                autoFocus,
                ...props
            },
            ref,
        ) => {
            const [isFilled, setIsFilled] = useState<boolean>(!!value);

            const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
                setIsFilled(!!e.target.value);
            };

            const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                setIsFilled(!!e.target.value);
                if (onChange) onChange(e); // Сохраняем обработчик изменений
            };

            const combinedClasses = classNames(
                styles.input,
                styles[intent],
                styles[inputSize],
                styles.inputWrapper,
                isFilled && styles.filled,
                errorMessage && styles.error,
                className,
            );

            return (
                <div>
                    <div className={styles.inputWrapper}>
                        <input
                            id={id}
                            type={type}
                            value={value} // Передаем значение, чтобы избежать `undefined`
                            onChange={handleChange}
                            onBlur={handleBlur}
                            ref={ref}
                            autoFocus={autoFocus}
                            placeholder={placeholder}
                            className={combinedClasses}
                            {...props}
                        />
                        {label && (
                            <label htmlFor={id} className={styles.label}>
                                {label}
                            </label>
                        )}
                    </div>

                    {errorMessage && (
                        <span className={styles.errorMessage}>
                            <Image
                                width={16}
                                height={16}
                                src={'/exclamationmark.svg'}
                                alt="exclamationmark"
                            />
                            {errorMessage}
                        </span>
                    )}
                </div>
            );
        },
    );

Input.displayName = 'Input';

export default Input;
