import React from 'react';
import { InputContainer, Label, Input } from './styles';

function FormikInputText({
    labelText,
    inputId,
    value,
    errors,
    touched,
    onChange,
    onBlur,
    setTouched,
    ...props
}) {
    function handleInputFocus() {
        const body = {
            ...touched,
            [inputId]: false,
        };
        setTouched(body);
    }
    return (
        <InputContainer>
            <Label htmlFor={inputId}>{labelText}</Label>
            <Input
                onFocus={handleInputFocus}
                onBlur={onBlur}
                {...props}
                id={inputId}
                name={inputId}
                value={value}
                onChange={onChange}
                touched={touched[inputId]}
            />
            {errors && touched[inputId] ? <span>{errors}</span> : <span></span>}
        </InputContainer>
    );
}

export default FormikInputText;
