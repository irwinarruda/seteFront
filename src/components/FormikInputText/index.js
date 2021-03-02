import React from 'react';
import { InputContainer, Label, Input } from './styles';

function FormikInputText({
    labelText,
    inputId,
    value,
    onChange,
    errors,
    touched,
    ...props
}) {
    return (
        <InputContainer>
            <Label htmlFor={inputId}>{labelText}</Label>
            <Input
                {...props}
                id={inputId}
                name={inputId}
                value={value}
                onChange={onChange}
                touched={touched}
            />
            {errors && touched ? <span>{errors}</span> : <span></span>}
        </InputContainer>
    );
}

export default FormikInputText;
