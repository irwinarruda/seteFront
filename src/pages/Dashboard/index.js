import React from 'react';
import { Container, BoxContainer } from './styles';

import BoxNavMenu from './BoxNavMenu';
import LeafletComponent from './LeafletComponent';
import FreeAccessComponent from './FreeAccessComponent';
import CityTableComponent from './CityTableComponent';

function Dashboard() {
    const [navActive, setNavActive] = React.useState('section-map-cities');

    return (
        <Container>
            <BoxContainer>
                <BoxNavMenu navActive={navActive} setNavActive={setNavActive} />
                {navActive === 'section-map-cities' ? (
                    <LeafletComponent />
                ) : navActive === 'section-info-table' ? (
                    <CityTableComponent />
                ) : (
                    <FreeAccessComponent />
                )}
            </BoxContainer>
        </Container>
    );
}

export default Dashboard;
