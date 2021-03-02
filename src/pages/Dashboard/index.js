import React from 'react';
import { Container, BoxContainer, BoxNavMenu } from './styles';
import { ReactSVG } from 'react-svg';
import MapIcon from '../../assets/icon/nav-map.svg';
import FreeAccessIcon from '../../assets/icon/nav-free-access.svg';
import InfoTableIcon from '../../assets/icon/nav-info-table.svg';

import LeafletComponent from './LeafletComponent';
import FreeAccessComponent from './FreeAccessComponent';

function Dashboard() {
    const [navActive, setNavActive] = React.useState('section-map-cities');

    return (
        <Container>
            <BoxContainer>
                <BoxNavMenu>
                    <div
                        className={`box-nav-button${
                            navActive === 'section-map-cities'
                                ? ' box-nav-button-active'
                                : ''
                        }`}
                        onClick={() => setNavActive('section-map-cities')}
                    >
                        <ReactSVG src={MapIcon} />
                        <h2>MAPA SETE</h2>
                    </div>
                    <div
                        className={`box-nav-button${
                            navActive === 'section-info-table'
                                ? ' box-nav-button-active'
                                : ''
                        }`}
                        onClick={() => setNavActive('section-info-table')}
                    >
                        <ReactSVG src={InfoTableIcon} />
                        <h2>TABELA</h2>
                    </div>
                    <div
                        className={`box-nav-button${
                            navActive === 'section-free-access'
                                ? ' box-nav-button-active'
                                : ''
                        }`}
                        onClick={() => setNavActive('section-free-access')}
                    >
                        <ReactSVG src={FreeAccessIcon} />
                        <h2>LIBERAR ACESSO</h2>
                    </div>
                </BoxNavMenu>
                {navActive === 'section-map-cities' ? (
                    <LeafletComponent />
                ) : navActive === 'section-info-table' ? (
                    <FreeAccessComponent />
                ) : (
                    <FreeAccessComponent />
                )}
            </BoxContainer>
        </Container>
    );
}

export default Dashboard;
