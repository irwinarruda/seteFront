import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignIn from '../../pages/SignIn';

let mockCreateModal = jest.fn();
let mockClearModal = jest.fn();
let mockSignInAsync = jest.fn();
let mockErrorHandler = jest.fn();

jest.mock('../../hooks/AlertModal', () => {
    return {
        useAlertModal: () => ({
            clearModal: mockClearModal,
            createModal: mockCreateModal,
        }),
    };
});
jest.mock('../../hooks/Errors', () => {
    return {
        useErrorHandler: () => ({
            errorHandler: mockErrorHandler,
        }),
    };
});
jest.mock('../../hooks/AuthContex', () => {
    return {
        useAuth: () => ({
            signInAsync: mockSignInAsync,
        }),
    };
});

jest.useFakeTimers();

describe('SignIn Page', () => {
    beforeEach(() => {
        mockCreateModal.mockClear();
        mockClearModal.mockClear();
        mockSignInAsync.mockClear();
        mockErrorHandler.mockClear();
    });
    it('should be able to signin', async () => {
        const { getByLabelText, getByText } = render(<SignIn />);
        const emailField = getByLabelText('E-mail');
        const passwordField = getByLabelText('Senha');
        const buttonElement = getByText('Entrar');

        fireEvent.change(emailField, {
            target: { value: 'arruda.irwin@gmail.com' },
        });
        fireEvent.change(passwordField, { target: { value: '123' } });
        fireEvent.click(buttonElement);

        await waitFor(() => {
            expect(mockSignInAsync).toHaveBeenCalled();
            expect(mockClearModal).toHaveBeenCalled();
        });
    });
    it('should validate written form', async () => {
        render(<SignIn />);
        const emailField = screen.getByLabelText('E-mail');
        const passwordField = screen.getByLabelText('Senha');
        const buttonElement = screen.getByText('Entrar');

        userEvent.type(emailField, 'non-existing-email');
        userEvent.type(passwordField, '2w');
        userEvent.click(buttonElement);

        await waitFor(() => {
            expect(
                screen.getByText('Senha deve ter 3 caracteres'),
            ).toBeInTheDocument();
            expect(
                screen.getByText('O valor deve ser um email válido'),
            ).toBeInTheDocument();
        });
    });
    it('should validate required form', async () => {
        render(<SignIn />);
        const emailField = screen.getByLabelText('E-mail');
        const passwordField = screen.getByLabelText('Senha');
        const buttonElement = screen.getByText('Entrar');

        userEvent.type(emailField, '');
        userEvent.type(passwordField, '');
        userEvent.click(buttonElement);

        await waitFor(() => {
            expect(
                screen.getByText('O Email deve ser preenchido'),
            ).toBeInTheDocument();
            expect(
                screen.getByText('Deve digitar a senha'),
            ).toBeInTheDocument();
        });
    });
    it('should throw error in formikSubmit', async () => {
        mockSignInAsync.mockImplementation(() => {
            throw { messages: 'Erro ao fazer login' };
        });
        const { getByLabelText, getByText } = render(<SignIn />);
        const emailField = getByLabelText('E-mail');
        const passwordField = getByLabelText('Senha');
        const buttonElement = getByText('Entrar');

        fireEvent.change(emailField, {
            target: { value: 'non-existing-email@gmail.com' },
        });
        fireEvent.change(passwordField, {
            target: { value: 'non-existing-password' },
        });
        fireEvent.click(buttonElement);

        await waitFor(() => {
            expect(mockErrorHandler).toHaveBeenCalledWith(
                { messages: 'Erro ao fazer login' },
                { title: 'Erro ao entrar no sistema' },
            );
        });
    });
});
