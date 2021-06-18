import React from 'react';
import { InputContainer, Label, Input } from './styles';

interface IControlledTableSearchInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    labelText: string;
    name: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

const ControlledTableSearchInput: React.FC<IControlledTableSearchInputProps> = ({
    labelText,
    name,
    onChange,
    value = '',
    ...props
}) => {
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
};

export default ControlledTableSearchInput;
