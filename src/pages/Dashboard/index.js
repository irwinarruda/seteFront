import React from 'react';
import { Container, BoxContainer } from './styles';

import BoxNavMenu from './BoxNavMenu';
import LeafletComponent from './LeafletComponent';
import FreeAccessComponent from './FreeAccessComponent';
import CityTableComponent from './CityTableComponent';

const menuNavTypes = {
    section_map_cities: LeafletComponent,
    section_info_table: CityTableComponent,
    section_free_access: FreeAccessComponent,
};

function Dashboard() {
    const [navActive, setNavActive] = React.useState('section_map_cities');

    const RenderLayout = menuNavTypes[navActive || 'section_map_cities'];

    return (
        <Container>
            <BoxContainer>
                <BoxNavMenu navActive={navActive} setNavActive={setNavActive} />
                <RenderLayout />
            </BoxContainer>
        </Container>
    );
}

export default Dashboard;
