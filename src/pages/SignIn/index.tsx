import React from 'react';
import { Container, SignInContainer } from './styles';
import { Link } from 'react-router-dom';

import FormikInputText from '../../components/Inputs/FormikInputText';
import SignButton from '../../components/Buttons/SignButton';
import SeteLogo from '../../assets/svg/sete-logo.svg';

import { useAuth } from '../../hooks/AuthContex';
import { useAlertModal } from '../../hooks/AlertModal';
import { useErrorHandler } from '../../hooks/Errors';
import { ImSpinner2 } from 'react-icons/im';

import md5 from 'md5';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

interface IFormikValues {
    email_field: string;
    password_field: string;
}

const SignIn: React.FC = () => {
    const { signInAsync } = useAuth();
    const { clearModal, createModal } = useAlertModal();
    const { errorHandler } = useErrorHandler();

    const handleFormikSubmit = React.useCallback(
        async (
            values: IFormikValues,
            { setSubmitting, resetForm }: FormikHelpers<IFormikValues>,
        ): Promise<void> => {
            try {
                setSubmitting(true);
                createModal();
                const body = {
                    usuario: values.email_field,
                    senha: md5(values.password_field),
                };
                await signInAsync(body);
                setTimeout(() => {
                    clearModal();
                }, 2000);
            } catch (err) {
                errorHandler(err, { title: 'Erro ao entrar no sistema' });
            } finally {
                setSubmitting(false);
                resetForm();
            }
        },
        [createModal, clearModal, errorHandler, signInAsync],
    );

    return (
        <Container>
            <SignInContainer>
                <div>
                    <img src={SeteLogo} alt="Logo do SETE" />
                </div>
                <Formik
                    initialValues={{ email_field: '', password_field: '' }}
                    validationSchema={Yup.object().shape({
                        email_field: Yup.string()
                            .required('O Email deve ser preenchido')
                            .email('O valor deve ser um email válido'),
                        password_field: Yup.string()
                            .required('Deve digitar a senha')
                            .min(3, 'Senha deve ter 3 caracteres'),
                    })}
                    validateOnBlur={true}
                    validateOnChange={false}
                    onSubmit={handleFormikSubmit}
                >
                    {({ handleSubmit, isSubmitting }) => (
                        <Form onSubmit={handleSubmit}>
                            <FormikInputText
                                type="text"
                                labelText="E-mail"
                                name="email_field"
                            />
                            <FormikInputText
                                type="password"
                                labelText="Senha"
                                name="password_field"
                            />
                            <div>
                                {isSubmitting ? (
                                    <ImSpinner2
                                        size={40}
                                        color="#FBCF02"
                                        style={{ marginBottom: '5px' }}
                                    />
                                ) : (
                                    <SignButton
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        Entrar
                                    </SignButton>
                                )}
                            </div>
                        </Form>
                    )}
                </Formik>
            </SignInContainer>
        </Container>
    );
};

export default SignIn;
