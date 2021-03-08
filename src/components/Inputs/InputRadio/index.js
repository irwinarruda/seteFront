import React from 'react';
import { Label } from './styles';

function InputRadio({ name, id, label, value, checked, setChecked, ...props }) {
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
}

export default InputRadio;
