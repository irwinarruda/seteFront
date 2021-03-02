import React from 'react';
import { Container, SignInContainer } from './styles';
import { Link } from 'react-router-dom';

import FormikInputText from '../../components/FormikInputText';
import SignButton from '../../components/Buttons/SignButton';
import SeteLogo from '../../assets/svg/sete-logo.svg';

import { useAuth } from '../../context/AuthContex';
import { USER_LOGIN_AUTH } from '../../services/UserApi';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

import md5 from 'md5';
import { Formik } from 'formik';
import * as Yup from 'yup';

function SignIn() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { signIn } = useAuth();

    async function handleSubmit(event) {
        try {
            event.preventDefault();
            const schema = Yup.object().shape({
                usuario: Yup.string()
                    .required('O Email deve ser preenchido')
                    .email('O valor deve ser um email válido'),
                senha: Yup.string().min(3, 'Senha deve ter 3 caracteres'),
            });
            const body = {
                usuario: email,
                senha: md5(password),
            };
            await schema.validate(body, {
                abortEarly: false,
            });
            const response = await axios(USER_LOGIN_AUTH(body));
            const data = await response.data;
            if (!data.status) {
                throw new Error(data.messages);
            }
            if (data.access_token) {
                signIn(data.access_token.access_token);
            }
        } catch (err) {
            toast.error(err.toString(), {
                position: 'top-center',
                autoClose: 7000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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
                        'password-field': Yup.string().min(
                            3,
                            'Senha deve ter 3 caracteres',
                        ),
                    })}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <FormikInputText
                                type="text"
                                labelText="E-mail"
                                inputId="email-field"
                                value={values['email-field']}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                errors={errors['email-field']}
                                touched={touched['email-field']}
                            />
                            <FormikInputText
                                type="password"
                                labelText="Senha"
                                inputId="password-field"
                                value={values['password-field']}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                errors={errors['password-field']}
                                touched={touched['password-field']}
                            />
                            <div>
                                <SignButton type="submit">Entrar</SignButton>
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
