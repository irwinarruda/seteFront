import React from 'react';
import { Field } from 'formik';
import { Label } from './styles';

function FormikInputRadio({ labelText, name, value, ...props }) {
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
}

export default FormikInputRadio;
