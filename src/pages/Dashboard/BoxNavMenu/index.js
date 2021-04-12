import React from 'react';
import { Container } from './styles';

import { ReactSVG } from 'react-svg';
import MapIcon from '../../../assets/icon/nav-map.svg';
import FreeAccessIcon from '../../../assets/icon/nav-free-access.svg';
import InfoTableIcon from '../../../assets/icon/nav-info-table.svg';

function BoxNavMenu({ navActive, setNavActive }) {
    return (
        <Container>
            <div
                className={`box-nav-button${
                    navActive === 'section_map_cities'
                        ? ' box-nav-button-active'
                        : ''
                }`}
                onClick={() => setNavActive('section_map_cities')}
            >
                <ReactSVG src={MapIcon} />
                <h2>MAPA SETE</h2>
            </div>
            <div
                className={`box-nav-button${
                    navActive === 'section_info_table'
                        ? ' box-nav-button-active'
                        : ''
                }`}
                onClick={() => setNavActive('section_info_table')}
            >
                <ReactSVG src={InfoTableIcon} />
                <h2>TABELA</h2>
            </div>
            <div
                className={`box-nav-button${
                    navActive === 'section_free_access'
                        ? ' box-nav-button-active'
                        : ''
                }`}
                onClick={() => setNavActive('section_free_access')}
            >
                <ReactSVG src={FreeAccessIcon} />
                <h2>LIBERAR ACESSO</h2>
            </div>
        </Container>
    );
}

export default BoxNavMenu;
