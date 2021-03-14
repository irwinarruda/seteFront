import styled from 'styled-components';
import { showIn } from '../../../styles/global';

export const LeafletContainer = styled.div`
    animation: ${showIn} 0.3s ease-in;
    width: 100%;
    height: 580px;
    padding: 0px 1px 1px 1px;
    position: relative;

    flex-grow: 1;
    .mapview {
        border-radius: 0px 0px 10px 10px;
        width: 100%;
        height: 100%;
    }
`;
