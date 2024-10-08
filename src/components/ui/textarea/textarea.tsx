import React, {
    useState,
    useEffect,
    useRef,
    ForwardRefExoticComponent,
    RefAttributes,
} from 'react';
import styles from './textarea.module.scss';
import { classNames } from '@/utils/combineClasses';
import Image from 'next/image';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    id: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    intent?: 'default' | 'filled' | 'error';
    textareaSize?: 'medium';
    label?: string;
    errorMessage?: string;
}

const Textarea: ForwardRefExoticComponent<TextareaProps & RefAttributes<HTMLTextAreaElement>> =
    React.forwardRef<
        HTMLTextAreaElement, // Type for ref
        TextareaProps // Type for props
    >(
        (
            {
                id,
                value = '',
                intent = 'default',
                textareaSize = 'medium',
                label,
                errorMessage,
                onChange,
                className,
                ...props
            },
            ref,
        ) => {
            const [isFilled, setIsFilled] = useState<boolean>(!!value);
            const textareaRef = useRef<HTMLTextAreaElement | null>(null);

            useEffect(() => {
                if (textareaRef.current) {
                    adjustHeight(textareaRef.current);
                }
            }, []);

            useEffect(() => {
                setIsFilled(!!value);
            }, [value]);

            const adjustHeight = (textarea: HTMLTextAreaElement) => {
                textarea.style.height = '140px';
                textarea.style.height = `${textarea.scrollHeight}px`;
            };

            const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
                setIsFilled(!!e.target.value);
            };

            const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setIsFilled(!!e.target.value);
                if (onChange) onChange(e);
                if (textareaRef.current) {
                    adjustHeight(textareaRef.current);
                }
            };

            const setRef = (node: HTMLTextAreaElement) => {
                textareaRef.current = node;
                if (typeof ref === 'function') {
                    ref(node);
                } else if (ref) {
                    (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
                }
            };

            const combinedClasses = classNames(
                styles.textarea,
                styles[intent],
                styles[textareaSize],
                styles.textareaWrapper,
                isFilled && styles.filled,
                errorMessage && styles.error,
                className,
            );

            return (
                <div>
                    <div className={styles.textareaWrapper}>
                        <textarea
                            id={id}
                            value={value} // Передаем значение, чтобы избежать `undefined`
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={combinedClasses}
                            ref={setRef}
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

Textarea.displayName = 'Textarea';

export default Textarea;
