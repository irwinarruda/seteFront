import styled from 'styled-components';
import { showIn } from '../../../styles/global';

export const Container = styled.div`
    padding: var(--padding-mobile);
    animation: ${showIn} 0.3s ease-in;
`;
