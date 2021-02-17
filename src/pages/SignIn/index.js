import React from 'react';
import { Container, SignInContainer } from './styles';
import { Link } from 'react-router-dom';
import InputText from '../../components/InputText';
import SignButton from '../../components/Buttons/SignButton';
import SeteLogo from '../../assets/svg/sete-logo.svg';
import axios from 'axios';

function SignIn() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleSubmit(event) {
        event.preventDefault();
        const body = {
            usuario: email,
            senha: password,
        };
        /* fetch('http://sete.api/authenticator', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                console.log(json);
            }); */
        axios({
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            url: 'http://sete.api/authenticator',
            data: JSON.stringify(body),
        })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
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
