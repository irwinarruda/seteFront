import React from 'react';
import { Container, SignUpContainer } from './styles';
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
import { api, USER_CREATE } from '../../services/UserApi';

interface IFormikValues {
    name_field: string;
    email_field: string;
    password_field: string;
    password_confirm_field: string;
}

const SignUp: React.FC = () => {
    const { signInAsync } = useAuth();
    const { clearModal, createModal } = useAlertModal();
    const { errorHandler } = useErrorHandler();

    async function handleFormikSubmit(
        values: IFormikValues,
        { setSubmitting, resetForm }: FormikHelpers<IFormikValues>,
    ): Promise<void> {
        try {
            setSubmitting(true);
            createModal();
            const body = {
                nome: values.name_field,
                email: values.email_field,
                senha: values.password_field,
            };
        } catch (err) {
            errorHandler(err, { title: 'Erro ao entrar no sistema' });
        } finally {
            setSubmitting(false);
            resetForm();
        }
    }

    return (
        <Container>
            <SignUpContainer>
                <div>
                    <img src={SeteLogo} alt="Logo do SETE" />
                </div>
                <Formik
                    initialValues={{
                        name_field: '',
                        email_field: '',
                        password_field: '',
                        password_confirm_field: '',
                    }}
                    validationSchema={Yup.object().shape({
                        name_field: Yup.string().required(
                            'O Nome deve ser preenchido',
                        ),
                        email_field: Yup.string()
                            .required('O Email deve ser preenchido')
                            .email('O valor deve ser um email válido'),
                        password_field: Yup.string()
                            .required('Deve digitar a senha')
                            .min(3, 'Senha deve ter 3 caracteres'),
                        password_confirm_field: Yup.string()
                            .required('Deve digitar a senha')
                            .oneOf(
                                [Yup.ref('password'), null],
                                'As senhas devem ser iguais',
                            ),
                    })}
                    validateOnBlur={true}
                    validateOnChange={false}
                    onSubmit={handleFormikSubmit}
                >
                    {({ handleSubmit, isSubmitting }) => (
                        <Form onSubmit={handleSubmit}>
                            <FormikInputText
                                type="text"
                                labelText="Nome"
                                name="name_field"
                            />
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
                            <FormikInputText
                                type="password"
                                labelText="Senha"
                                name="password_confirm_field"
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

                                <Link to="/">Fazer Login</Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </SignUpContainer>
        </Container>
    );
};

export default SignUp;
