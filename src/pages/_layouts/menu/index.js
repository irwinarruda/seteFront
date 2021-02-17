import React from 'react';
import { Link } from 'react-router-dom';
import {
    MainMenuContainer,
    MainMenuHeaderContainer,
    MainMenuHeader,
} from './styles';
import { AuthContext } from '../../../context/AuthContex';
import SeteLogoWhite from '../../../assets/svg/sete-logo-white.svg';

function Menu({ children }) {
    const { logout } = React.useContext(AuthContext);
    function handleLogoutClick() {
        logout();
    }
    return (
        <MainMenuContainer>
            <MainMenuHeaderContainer>
                <MainMenuHeader>
                    <div>
                        <img src={SeteLogoWhite} alt="Logo do software SETE" />
                    </div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Feature 1</Link>
                            </li>
                            <li>
                                <Link to="/">Feature 2</Link>
                            </li>
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
