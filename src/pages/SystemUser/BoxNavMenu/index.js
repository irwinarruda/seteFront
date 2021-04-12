import React from 'react';
import { Container } from './styles';

import { ReactSVG } from 'react-svg';
import RegisterIcon from '../../../assets/icon/nav-register.svg';
import UserListIcon from '../../../assets/icon/nav-user-list.svg';

function BoxNavMenu({ navActive, setNavActive }) {
    return (
        <Container>
            <div
                className={`box-nav-button${
                    navActive === 'section_user_register'
                        ? ' box-nav-button-active'
                        : ''
                }`}
                onClick={() => setNavActive('section_user_register')}
            >
                <ReactSVG src={RegisterIcon} />
                <h2>CADASTRO DE USUÁRIOS</h2>
            </div>
            <div
                className={`box-nav-button${
                    navActive === 'section_user_list'
                        ? ' box-nav-button-active'
                        : ''
                }`}
                onClick={() => setNavActive('section_user_list')}
            >
                <ReactSVG src={UserListIcon} />
                <h2>LISTA DE USUÁRIOS</h2>
            </div>
        </Container>
    );
}

export default BoxNavMenu;
