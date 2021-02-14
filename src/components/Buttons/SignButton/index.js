import React from 'react';
import { ButtonContainer } from './styles';

function SignButton({ children, ...props }) {
    return <ButtonContainer {...props}>{children}</ButtonContainer>;
}

export default SignButton;
