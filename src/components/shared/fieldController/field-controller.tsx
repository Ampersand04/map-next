import React, { ReactElement } from 'react';
import { Control, Controller } from 'react-hook-form';
import * as rf from 'react-form';

interface FieldControllerProps {
    className?: string;
    control: Control<any>;
    name: string;
    rules?: any;
    render: (fieldProps: { field: any; fieldState: any }) => ReactElement;
}

const FieldController: React.FC<FieldControllerProps> = ({
    className,
    control,
    name,
    rules,
    render,
}) => {
    return (
        <div className={className}>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field, fieldState }) => render({ field, fieldState })}
            />
        </div>
    );
};

export default FieldController;
