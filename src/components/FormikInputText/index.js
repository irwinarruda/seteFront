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
    const [isFocused, setIsFocused] = React.useState(false);

    const handleInputFocus = React.useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleInputBlur = React.useCallback(() => {
        setIsFocused(false);
    }, []);

    return (
        <InputContainer>
            <Label htmlFor={inputId}>{labelText}</Label>
            <Input
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                {...props}
                id={inputId}
                name={inputId}
                value={value}
                onChange={onChange}
                touched={touched}
            />
            {errors && !isFocused ? <span>{errors}</span> : <span></span>}
        </InputContainer>
    );
}

export default FormikInputText;
