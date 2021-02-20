import React from 'react';
import { Container, SignInContainer } from './styles';
import { Link } from 'react-router-dom';
import md5 from 'md5';
import InputText from '../../components/InputText';
import SignButton from '../../components/Buttons/SignButton';
import SeteLogo from '../../assets/svg/sete-logo.svg';

import { useAuth } from '../../context/AuthContex';
import { USER_LOGIN_AUTH } from '../../services/UserApi';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function SignIn() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { signIn } = useAuth();

    async function handleSubmit(event) {
        try {
            event.preventDefault();
            const body = {
                usuario: email,
                senha: md5(password),
            };
            const response = await axios(USER_LOGIN_AUTH(body));
            const json = await response.data;
            if (json.status) {
                throw new Error(json.messages);
            }
            if (json.access_token) {
                signIn(json.access_token.access_token);
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
                <form onSubmit={handleSubmit}>
                    <InputText
                        type="text"
                        labelText="E-mail"
                        inputId="email-field"
                        value={email}
                        setValue={setEmail}
                    />
                    <InputText
                        type="password"
                        labelText="Senha"
                        inputId="password-field"
                        value={password}
                        setValue={setPassword}
                    />
                    <div>
                        <SignButton type="submit">Entrar</SignButton>
                        <Link to="/registrar">Registrar</Link>
                    </div>
                </form>
            </SignInContainer>
        </Container>
    );
}

export default SignIn;
