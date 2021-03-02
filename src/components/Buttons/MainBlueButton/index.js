import React from 'react';
import { ButtonContainer } from './styles';

function MainBlueButton({ children, ...props }) {
    return <ButtonContainer {...props}>{children}</ButtonContainer>;
}

export default MainBlueButton;
