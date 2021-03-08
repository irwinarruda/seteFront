import React from 'react';
import { Container, SignInContainer } from './styles';
import { Link } from 'react-router-dom';

import FormikInputText from '../../components/Inputs/FormikInputText';
import SignButton from '../../components/Buttons/SignButton';
import SeteLogo from '../../assets/svg/sete-logo.svg';

import { useAuth } from '../../context/AuthContex';
import swal from 'sweetalert';
import { ImSpinner2 } from 'react-icons/im';

import md5 from 'md5';
import { Formik } from 'formik';
import * as Yup from 'yup';

function SignIn() {
    const { signInAsync, handleRequestError } = useAuth();

    async function handleFormikSubmit(values, { setSubmitting, resetForm }) {
        try {
            setSubmitting(true);
            const body = {
                usuario: values['email-field'],
                senha: md5(values['password-field']),
            };
            await signInAsync(body);
            swal('Sucesso!', 'Login feito com sucesso', 'success');
            setTimeout(() => {
                swal.close();
            }, 2000);
        } catch (err) {
            const errorMessage = handleRequestError(err);
            await swal('Erro ao entrar no sistema', errorMessage, 'error');
        } finally {
            setSubmitting(false);
            resetForm();
        }
    }

    return (
        <Container>
            <SignInContainer>
                <div>
                    <img src={SeteLogo} alt="Logo do SETE" />
                </div>
                <Formik
                    initialValues={{ 'email-field': '', 'password-field': '' }}
                    validationSchema={Yup.object().shape({
                        'email-field': Yup.string()
                            .required('O Email deve ser preenchido')
                            .email('O valor deve ser um email válido'),
                        'password-field': Yup.string()
                            .required('Deve digitar a senha')
                            .min(3, 'Senha deve ter 3 caracteres'),
                    })}
                    onSubmit={handleFormikSubmit}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setTouched,
                        isSubmitting,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <FormikInputText
                                type="text"
                                labelText="E-mail"
                                inputId="email-field"
                                value={values['email-field']}
                                errors={errors['email-field']}
                                touched={touched}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                setTouched={setTouched}
                            />
                            <FormikInputText
                                type="password"
                                labelText="Senha"
                                inputId="password-field"
                                value={values['password-field']}
                                errors={errors['password-field']}
                                touched={touched}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                setTouched={setTouched}
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

                                <Link to="/registrar">Registrar</Link>
                            </div>
                        </form>
                    )}
                </Formik>
            </SignInContainer>
        </Container>
    );
}

export default SignIn;
