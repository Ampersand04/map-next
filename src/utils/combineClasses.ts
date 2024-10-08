export const classNames = (...classes: (string | undefined | boolean)[]): string => {
    return classes.filter(Boolean).join(' ');
};
