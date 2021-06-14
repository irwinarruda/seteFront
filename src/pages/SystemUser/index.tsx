import React from 'react';
import { Container, BoxContainer } from './styles';

import BoxNavMenu from './BoxNavMenu';
import Register from './Register';
import List from './List';

type menuNavTypes = keyof typeof menuNavItems;

const menuNavItems = {
    section_user_register: Register,
    section_user_list: List,
};

function SystemUser() {
    const [navActive, setNavActive] = React.useState<menuNavTypes>(
        'section_user_register',
    );

    const RenderLayout = menuNavItems[navActive || 'section_user_register'];

    return (
        <Container>
            <BoxContainer>
                <BoxNavMenu navActive={navActive} setNavActive={setNavActive} />
                <RenderLayout />
            </BoxContainer>
        </Container>
    );
}

export default SystemUser;
