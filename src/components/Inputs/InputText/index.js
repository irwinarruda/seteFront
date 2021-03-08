import React from 'react';
import { InputContainer, Label, Input } from './styles';

function InputText({ labelText, inputId, value, setValue, ...props }) {
    const handleInputTextChange = React.useCallback(
        (event) => {
            setValue(event.target.value);
        },
        [setValue],
    );

    return (
        <InputContainer>
            <Label htmlFor={inputId}>{labelText}</Label>
            <Input
                {...props}
                id={inputId}
                value={value}
                onChange={handleInputTextChange}
            />
        </InputContainer>
    );
}

export default InputText;
