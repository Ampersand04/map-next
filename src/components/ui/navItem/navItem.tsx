import React from 'react';
import styles from './nav-item.module.scss';
import useScrollNavigation from '@/hooks/useScrollNavigation';
import { classNames } from '@/utils/combineClasses';

interface NavItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
    targetId: string; // ID элемента для скролла
    intent?: 'default' | 'active'; // Используется для стиля активного состояния
    size?: 'medium';
}

const NavItem: React.FC<NavItemProps> = ({
    targetId,
    intent = 'default',
    size = 'medium',
    className,
    children,
    ...props
}) => {
    const { activeId, handleClick } = useScrollNavigation([targetId]);
    const isActive = activeId === targetId;

    // const intentClasses = {
    //     default: styles.default,
    //     active: styles.active,
    // };

    // const sizeClasses = {
    //     medium: styles.medium,
    // };

    // const combinedClasses = [
    //     styles.navItem,
    //     sizeClasses[size],
    //     isActive ? intentClasses.active : intentClasses.default,
    //     className,
    // ]
    //     .filter(Boolean)
    //     .join(' ');

    const combinedClasses = classNames(
        styles.navItem,
        styles[intent],
        styles[size],
        isActive ? styles.active : styles.default,
        className,
    );

    return (
        <a
            className={combinedClasses}
            onClick={(e) => {
                e.preventDefault();
                handleClick(targetId);
            }}
            {...props}>
            {children}
        </a>
    );
};

export default NavItem;
