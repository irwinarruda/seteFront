import React from 'react';
import { Container, BoxContainer } from './styles';

import BoxNavMenu from './BoxNavMenu';
import LeafletComponent from './LeafletComponent';
import FreeAccessComponent from './FreeAccessComponent';
import TableComponent from './TableComponent';

function Dashboard() {
    const [navActive, setNavActive] = React.useState('section-map-cities');

    return (
        <Container>
            <BoxContainer>
                <BoxNavMenu navActive={navActive} setNavActive={setNavActive} />
                {navActive === 'section-map-cities' ? (
                    <LeafletComponent />
                ) : navActive === 'section-info-table' ? (
                    <TableComponent />
                ) : (
                    <FreeAccessComponent />
                )}
            </BoxContainer>
        </Container>
    );
}

export default Dashboard;
