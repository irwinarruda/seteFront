import styled, { css } from 'styled-components';
import { showIn } from '../../../styles/global';

export const LeafletContainer = styled.div`
    animation: ${showIn} 0.3s ease-in;
    width: 100%;
    height: auto;
    padding: 0px 1px 1px 1px;
    position: relative;
    overflow: hidden;

    flex-grow: 1;
    .mapview {
        position: relative;
        z-index: 1;
        border-radius: 0px 0px 10px 10px;
        width: 100%;
        height: 580px;
        transition: all 0.2s linear;

        ${(props) =>
            props.modalIsOpened &&
            css`
                filter: blur(8px);

                @media (max-width: 700px) {
                    height: 620px;
                }

                @media (max-width: 454px) {
                    height: 675px;
                }
            `}
    }
`;

export const ModalItems = styled.div``;
