import React from 'react';
import { Container, SignUpContainer } from './styles';
import { Link } from 'react-router-dom';
import InputText from '../../components/InputText';
import SignButton from '../../components/Buttons/SignButton';
import SeteLogo from '../../assets/svg/sete-logo.svg';

function SignUp() {
    const [nome, setNome] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <Container>
            <SignUpContainer>
                <div>
                    <img src={SeteLogo} alt="Logo do SETE" />
                </div>
                <form onSubmit={handleSubmit}>
                    <InputText
                        type="text"
                        labelText="Nome"
                        inputId="name-field"
                        value={nome}
                        setValue={setNome}
                    />
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
                    <InputText
                        type="password"
                        labelText="Confirmar Senha"
                        inputId="confirm-password-field"
                        value={confirmPassword}
                        setValue={setConfirmPassword}
                    />
                    <div>
                        <SignButton type="submit">Criar Conta</SignButton>
                        <Link to="/">Entrar</Link>
                    </div>
                </form>
            </SignUpContainer>
        </Container>
    );
}

export default SignUp;
