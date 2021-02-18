import React from 'react';
import { Container, SignInContainer } from './styles';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContex';
import InputText from '../../components/InputText';
import SignButton from '../../components/Buttons/SignButton';
import SeteLogo from '../../assets/svg/sete-logo.svg';

import { USER_LOGIN_AUTH } from '../../UserApi';
import axios from 'axios';

function SignIn() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { login } = React.useContext(AuthContext);

    async function handleSubmit(event) {
        try {
            event.preventDefault();
            const body = {
                usuario: email,
                senha: password,
            };
            const response = await axios(USER_LOGIN_AUTH(body));
            const access_token = response.data.access_token;
            window.localStorage.setItem('token', access_token);
            console.log(access_token);
            login();
        } catch (err) {
            console.error(err);
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
