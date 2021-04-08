import React from 'react';
import { InputContainer, Label, Input } from './styles';

function TableSearchInput({ labelText, name, onChange, ...props }) {
    return (
        <InputContainer>
            <Label htmlFor={name}>{labelText}</Label>
            <Input {...props} id={name} name={name} onChange={onChange} />
        </InputContainer>
    );
}

export default TableSearchInput;
