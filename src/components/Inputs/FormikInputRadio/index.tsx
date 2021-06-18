import React from 'react';
import { Field, FieldAttributes } from 'formik';
import { Label } from './styles';

interface IFormikInputRadioProps extends FieldAttributes<any> {
    labelText: string;
    name: string;
    value: string;
}

const FormikInputRadio: React.FC<IFormikInputRadioProps> = ({
    labelText,
    name,
    value,
    ...props
}) => {
    return (
        <Label htmlFor={value}>
            <Field
                type="radio"
                name={name}
                id={value}
                value={value}
                {...props}
            />
            <span></span>
            {labelText}
        </Label>
    );
};

export default FormikInputRadio;
