import React from 'react';
import { Label } from './styles';

interface IInputRadioProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'checked'> {
    name: string;
    id: string;
    label: string;
    value: string;
    checked: string;
    setChecked: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputRadio: React.FC<IInputRadioProps> = ({
    name,
    id,
    label,
    value,
    checked,
    setChecked,
    ...props
}) => {
    const handleChange = React.useCallback(
        (event) => {
            setChecked(event.target.value);
        },
        [setChecked],
    );

    return (
        <Label htmlFor={id}>
            <input
                type="radio"
                name={name}
                id={id}
                value={value}
                checked={checked === value}
                onChange={handleChange}
                {...props}
            />
            <span></span>
            {label}
        </Label>
    );
};

export default InputRadio;
