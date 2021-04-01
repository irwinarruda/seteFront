import React from 'react';
import { useField, useFormikContext } from 'formik';
import { InputContainer, Label, Input } from './styles';

function FormikInputText({ labelText, focushandler, ...props }) {
    const [field, meta] = useField(props);
    const {
        touched: touchedState,
        setTouched: setTouchedState,
    } = useFormikContext(props);

    const handleFocus = React.useCallback(() => {
        setTouchedState({ ...touchedState, [props.name]: false });
    }, [touchedState, setTouchedState]);
    return (
        <InputContainer>
            <Label htmlFor={props.name}>{labelText}</Label>
            <div className="input-field">
                <Input
                    className="input-system"
                    id={props.name}
                    name={props.name}
                    onFocus={handleFocus}
                    {...field}
                    {...props}
                />
                <span>{meta.touched && meta.error}</span>
            </div>
        </InputContainer>
    );
}

export default FormikInputText;
