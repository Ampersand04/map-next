import React, { useState } from 'react';
import styles from './question.module.scss';
import Image from 'next/image';
import { classNames } from '@/utils/combineClasses'; // Импортируйте утилиту

interface QuestionProps extends React.HTMLAttributes<HTMLDivElement> {
    intent?: 'default' | 'active';
    size?: 'medium';
    question: string;
    answer: string;
}

const Question: React.FC<QuestionProps> = ({
    intent = 'default',
    size = 'medium',
    className,
    question,
    answer,
    ...props
}) => {
    const [isActive, setIsActive] = useState(false);

    const handleToggleActive = () => {
        setIsActive(!isActive);
    };

    const combinedClasses = classNames(
        styles.quastions,
        styles[size],
        isActive ? styles.active : styles.default,
        className,
    );

    return (
        <div className={combinedClasses} onClick={handleToggleActive} {...props}>
            <div className={styles.question}>
                {question}
                <Image
                    className={isActive ? 'rotate-180' : ''}
                    width={12}
                    height={20}
                    src={'/arrowOpen.svg'}
                    alt={'arrowOpen.svg'}
                />
            </div>
            <div className={isActive ? styles.activeAnswer : styles.answer}>{answer}</div>
        </div>
    );
};

export default Question;
