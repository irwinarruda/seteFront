import styled, { css } from 'styled-components';
import { showIn } from '../../../styles/global';

export const Container = styled.div`
    width: 100%;
    height: auto;
    animation: ${showIn} 0.3s ease-in;

    .ReactCollapse--collapse {
        transition: height 500ms ease-in-out;
    }
`;

export const LeafletContainer = styled.div`
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
        padding-bottom: 20px;
        width: 100%;
        height: 580px;
        transition: all 0.2s linear;

        ${(props) =>
            props.modalIsOpened &&
            css`
                filter: blur(8px);
            `}

        @media (max-width: 700px) {
            height: 650px;
        }

        @media (max-width: 454px) {
            height: 730px;
        }
    }
`;

export const AditionalInfo = styled.div`
    .aditional-button-container {
        position: absolute;
        z-index: 10;
        top: 10px;
        right: 10px;
        ${(props) =>
            props.modalIsOpened &&
            css`
                filter: blur(5px);
            `}
        button {
            display: block;
            width: 30px;
            height: 30px;
            padding: 0px;
            border-radius: 3px;
            border: none;
            transition: all 0.1s linear;
            & + button {
                margin-top: 5px;
            }
            &.button-recluster {
                background-color: #ffbc31;
                &:hover {
                    background-color: #f8b01d;
                }
            }
            &.button-general-info {
                background-color: var(--color-blue);
                &:hover {
                    background-color: var(--color-dark-blue);
                }
            }
            &:disabled {
                cursor: default;
                &.button-recluster {
                    &:hover {
                        background-color: #ffbc31;
                    }
                }
                &.button-general-info {
                    &:hover {
                        background-color: var(--color-blue);
                    }
                }
            }
        }
    }
`;

export const LoadingScreen = styled.div`
    position: absolute;
    z-index: 10;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        width: 300px;
        height: 300px;
    }
`;
