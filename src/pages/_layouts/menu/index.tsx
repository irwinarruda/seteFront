import React from 'react';
import {
    MainMenuContainer,
    MainMenuHeaderContainer,
    MainMenuHeader,
} from './styles';
import { LocationDescriptorObject } from 'history';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useAuth } from '../../../hooks/AuthContex';
import SeteLogoWhite from '../../../assets/svg/sete-logo-white.svg';

const Menu: React.FC<{ location: LocationDescriptorObject }> = ({
    children,
}) => {
    const history = useHistory();
    const { signOut } = useAuth();
    const handleLogoutClick = React.useCallback((): void => {
        signOut();
    }, [signOut, history]);
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
                                <NavLink
                                    to="/dashboard"
                                    activeClassName="menu-active"
                                    exact
                                >
                                    Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/usuarios"
                                    activeClassName="menu-active"
                                    exact
                                >
                                    Usuários
                                </NavLink>
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
};

export default Menu;
