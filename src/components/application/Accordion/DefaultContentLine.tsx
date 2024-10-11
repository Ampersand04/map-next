import React from 'react';

interface DefaultContentLineProps {
    name?: string;
    content?: string | number;
}

const DefaultContentLine: React.FC<DefaultContentLineProps> = ({ name, content }) => {
    return (
        <div>
            <p className="text-xs text-text-secondary">{name}</p>
            <p className="text-sm text-text  font-semibold">{content}</p>
        </div>
    );
};

export default DefaultContentLine;
