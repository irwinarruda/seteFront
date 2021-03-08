import React from 'react';
import { Label } from './styles';

function InputRadio({
    name,
    inputId,
    labelText,
    value,
    checked,
    onChange,
    onBlur,
    ...props
}) {
    return (
        <Label htmlFor={inputId}>
            <input
                type="radio"
                name={name}
                id={inputId}
                value={value}
                checked={value === checked}
                onChange={() => onChange(name, value)}
                onBlur={onBlur}
                {...props}
            />
            <span></span>
            {labelText}
        </Label>
    );
}

export default InputRadio;
