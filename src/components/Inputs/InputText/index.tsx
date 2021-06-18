import React from 'react';
import { InputContainer, Label, Input } from './styles';

interface IInputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
    labelText: string;
    name: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

const InputText: React.FC<IInputTextProps> = ({
    labelText,
    name,
    value,
    setValue,
    ...props
}) => {
    const handleInputTextChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>): void => {
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
};

export default InputText;
