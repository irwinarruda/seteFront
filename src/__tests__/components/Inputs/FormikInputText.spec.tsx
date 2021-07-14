import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import FormikInputText from '../../../components/Inputs/FormikInputText';

let mockSetTouched = jest.fn();

jest.mock('formik', () => ({
    useField: (props: any) => [
        { name: props.name },
        { touched: false, error: '' },
    ],
    useFormikContext: () => ({ touched: {}, setTouched: mockSetTouched }),
}));

describe('FormikInputText Component', () => {
    beforeEach(() => {
        mockSetTouched.mockClear();
    });
    it('should render the input', async () => {
        const { getByPlaceholderText } = render(
            <FormikInputText
                labelText="E-mail:"
                name="email"
                placeholder="Digite seu Email"
            />,
        );
        expect(getByPlaceholderText('Digite seu Email')).toBeTruthy();
    });
    it('should change border color on focus', async () => {
        const { getByPlaceholderText } = render(
            <FormikInputText
                labelText="E-mail:"
                name="email"
                placeholder="Digite seu Email"
            />,
        );
        const formikInputText = getByPlaceholderText('Digite seu Email');
        fireEvent.focus(formikInputText);
        await waitFor(() => {
            expect(mockSetTouched).toHaveBeenCalled();
        });
    });
});
