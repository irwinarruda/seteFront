import React from 'react';
import { FieldAttributes, useField, useFormikContext } from 'formik';
import { InputContainer, Label, Input } from './styles';

type IFormikInputTextProps = { labelText: string } & FieldAttributes<{}>;

const FormikInputText: React.FC<IFormikInputTextProps> = ({
    labelText,
    ...props
}) => {
    const [field, meta] = useField<any>(props);
    const {
        touched: touchedState,
        setTouched: setTouchedState,
    } = useFormikContext();

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
                    onFocus={handleFocus}
                    {...field}
                    {...props}
                />
                <span>{meta.touched && meta.error}</span>
            </div>
        </InputContainer>
    );
};

export default FormikInputText;
