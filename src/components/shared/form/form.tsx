import React, { ForwardRefExoticComponent, RefAttributes } from 'react';
import styles from './form.module.scss';
import { classNames } from '@/utils/combineClasses';
import { UseFormReturn } from 'react-hook-form';

interface FormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
    intent?: 'default';
    onSubmit: (data: any) => void;
    methods: UseFormReturn<any>;
    children: React.ReactNode;
}

const Form: ForwardRefExoticComponent<FormProps & RefAttributes<HTMLFormElement>> =
    React.forwardRef<
        HTMLFormElement, // Тип рефа
        FormProps // Тип пропсов
    >(({ intent = 'default', className, children, onSubmit, methods, ...rest }, ref) => {
        const combinedClasses = classNames(styles.form, styles[intent], className);

        const { handleSubmit, ...formMethods } = methods;

        return (
            <form className={combinedClasses} onSubmit={handleSubmit(onSubmit)} {...rest} {...ref}>
                {children}
            </form>
        );
    });

Form.displayName = 'Form';

export default Form;
