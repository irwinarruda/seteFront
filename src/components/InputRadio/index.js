import React from 'react';
import { Label } from './styles';

function InputRadio({ name, id, label, value, checked, setChecked, ...props }) {
    function handleChange(event) {
        setChecked(event.target.value);
        console.log(value);
    }

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
