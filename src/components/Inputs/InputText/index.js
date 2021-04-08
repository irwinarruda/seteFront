import React from 'react';
import { InputContainer, Label, Input } from './styles';

function InputText({ labelText, name, value, setValue, ...props }) {
    const handleInputTextChange = React.useCallback(
        (event) => {
            setValue(event.target.value);
        },
        [setValue],
    );

    return (
        <InputContainer>
            <Label htmlFor={name}>{labelText}</Label>
            <Input
                {...props}
                id={name}
                name={name}
                value={value}
                onChange={handleInputTextChange}
            />
        </InputContainer>
    );
}

export default InputText;
