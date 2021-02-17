import React from 'react';
import { Container, SignInContainer } from './styles';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContex';
import InputText from '../../components/InputText';
import SignButton from '../../components/Buttons/SignButton';
import SeteLogo from '../../assets/svg/sete-logo.svg';

function SignIn() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { login } = React.useContext(AuthContext);

    function handleSubmit(event) {
        event.preventDefault();
        login();
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
