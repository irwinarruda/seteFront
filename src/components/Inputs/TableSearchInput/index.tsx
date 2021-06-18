import React from 'react';
import { InputContainer, Label, Input } from './styles';

interface ITableSearchInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    labelText: string;
    name: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TableSearchInput: React.FC<ITableSearchInputProps> = ({
    labelText,
    name,
    onChange,
    ...props
}) => {
    return (
        <InputContainer>
            <Label htmlFor={name}>{labelText}</Label>
            <Input {...props} id={name} name={name} onChange={onChange} />
        </InputContainer>
    );
};

export default TableSearchInput;
