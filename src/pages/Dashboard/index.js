import React from 'react';
import { Container, BoxContainer, BoxNavMenu } from './styles';
import { ReactSVG } from 'react-svg';
import MapIcon from '../../assets/icon/nav-map.svg';
import FreeAccessIcon from '../../assets/icon/nav-free-access.svg';

import LeafletComponent from './LeafletComponent';
import FreeAccessComponent from './FreeAccessComponent';

function Dashboard() {
    const [navActive, setNavActive] = React.useState(true);

    return (
        <Container>
            <BoxContainer>
                <BoxNavMenu>
                    <div
                        className={`box-nav-button${
                            navActive ? ' box-nav-button-active' : ''
                        }`}
                        onClick={() => setNavActive(true)}
                    >
                        <ReactSVG src={MapIcon} />
                        <h2>MAPA SETE</h2>
                    </div>
                    <div
                        className={`box-nav-button${
                            !navActive ? ' box-nav-button-active' : ''
                        }`}
                        onClick={() => setNavActive(false)}
                    >
                        <ReactSVG src={FreeAccessIcon} />
                        <h2>LIBERAR ACESSO</h2>
                    </div>
                </BoxNavMenu>
                {navActive ? <LeafletComponent /> : <FreeAccessComponent />}
            </BoxContainer>
        </Container>
    );
}

export default Dashboard;
