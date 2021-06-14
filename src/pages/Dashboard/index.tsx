import React from 'react';
import { Container, BoxContainer } from './styles';

import BoxNavMenu from './BoxNavMenu';
import LeafletComponent from './LeafletComponent';
import FreeAccessComponent from './FreeAccessComponent';
import CityTableComponent from './CityTableComponent';

type menuNavTypes = keyof typeof menuNavItems;

const menuNavItems = {
    section_map_cities: LeafletComponent,
    section_info_table: CityTableComponent,
    section_free_access: FreeAccessComponent,
};

const Dashboard: React.FC = () => {
    const [navActive, setNavActive] = React.useState<menuNavTypes>(
        'section_map_cities',
    );

    const RenderLayout = menuNavItems[navActive || 'section_map_cities'];

    return (
        <Container>
            <BoxContainer>
                <BoxNavMenu navActive={navActive} setNavActive={setNavActive} />
                <RenderLayout />
            </BoxContainer>
        </Container>
    );
};

export default Dashboard;
