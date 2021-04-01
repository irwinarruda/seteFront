import React from 'react';
import {
    MainMenuContainer,
    MainMenuHeaderContainer,
    MainMenuHeader,
} from './styles';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/AuthContex';
import SeteLogoWhite from '../../../assets/svg/sete-logo-white.svg';

function Menu({ children }) {
    const { signOut } = useAuth();
    function handleLogoutClick() {
        signOut();
    }
    return (
        <MainMenuContainer>
            <MainMenuHeaderContainer>
                <MainMenuHeader>
                    <Link to="/dashboard">
                        <img src={SeteLogoWhite} alt="Logo do software SETE" />
                    </Link>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/" onClick={handleLogoutClick}>
                                    Sair
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </MainMenuHeader>
            </MainMenuHeaderContainer>
            {children}
        </MainMenuContainer>
    );
}

export default Menu;
