import React, { ForwardRefExoticComponent, RefAttributes } from 'react';
import styles from './navigation.module.scss';
import { classNames } from '@/utils/combineClasses';

interface NavigationProps extends React.HTMLAttributes<HTMLElement> {
    intent?: 'default';
    size?: 'medium';
}

const Navigation: ForwardRefExoticComponent<NavigationProps & RefAttributes<HTMLElement>> =
    React.forwardRef<
        HTMLElement, // Тип рефа
        NavigationProps // Тип пропсов
    >(({ intent = 'default', size = 'medium', className, children, ...props }, ref) => {
        const combinedClasses = classNames(
            styles.navigation,
            styles[intent],
            styles[size],
            className,
        );

        return (
            <nav className={combinedClasses} ref={ref} {...props}>
                {children}
            </nav>
        );
    });

Navigation.displayName = 'Navigation';

export default Navigation;
