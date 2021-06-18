import React from 'react';
import { ButtonContainer } from './styles';

const SignButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
    children,
    ...props
}) => {
    return <ButtonContainer {...props}>{children}</ButtonContainer>;
};

export default SignButton;
