import React from 'react';
import { InputContainer, Label, Input } from './styles';

function ControlledTableSearchInput({
    labelText,
    name,
    onChange,
    value = '',
    ...props
}) {
    return (
        <InputContainer>
            <Label htmlFor={name}>{labelText}</Label>
            <Input
                {...props}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
            />
        </InputContainer>
    );
}

export default ControlledTableSearchInput;
