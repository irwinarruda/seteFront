import styled from 'styled-components';
import { fromTop } from '../../../../styles/global';

interface ILeaflet {
    modalIsOpened?: boolean;
}

export const Container = styled.div<ILeaflet>`
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 5;

    width: 100%;
    height: 100%;
    padding: 20px;

    background: transparent;
    border-radius: 0px 0px 10px 10px;

    animation: ${fromTop} 0.3s ease-out;
    ${(props) => (props.modalIsOpened ? 'display: initial;' : 'display: none;')}
`;

export const ModalContainer = styled.div`
    max-width: 900px;
    width: 100%;
    margin: 0 auto;

    .modal-back {
        width: 40px;
        cursor: pointer;
    }

    .modal-info {
        width: 100%;
        max-width: 500px;
        margin: -30px auto 0px auto;
        padding: 10px;
        text-align: center;

        background-color: var(--color-white);
        border-radius: 15px;
        box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.4);

        h2,
        h3 {
            font-family: var(--font-primary);
            color: var(--color-black);
        }

        & > div {
            display: flex;
            align-items: center;
            justify-content: center;
            & > h2 {
                margin-left: 20px;
                font-size: 30px;
                font-weight: 500;
            }
        }

        & > h3 {
            margin-top: 10px;
            font-size: 27px;
            font-weight: 600;
        }
    }

    @media (max-width: 700px) {
        .modal-info {
            margin-top: 10px;
        }
    }

    @media (max-width: 454px) {
        .modal-info {
            & > div {
                flex-direction: column;
                & > h2 {
                    margin-left: 0px;
                }
            }
        }
    }
`;

export const ModalItemsContainer = styled.div`
    width: 100%;
    overflow: auto;
`;

export const ModalItems = styled.div`
    margin: 20px auto 0px auto;
    width: 850px;

    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    & > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;

        flex: 1 1 175px;
        height: 175px;
        padding: 15px 20px;
        margin: 15px;

        background-color: var(--color-white);
        box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.4);
        border-radius: 15px;
        transition: all 0.05s linear;

        p,
        h4 {
            font-family: var(--font-primary);
            color: var(--color-black);
            text-align: center;
        }

        h4 {
            font-size: 32px;
        }

        & > div {
            width: 100%;
            text-align: center;

            svg {
                width: 100%;
                height: 55px;
            }
        }

        &:hover {
            transform: scale(1.04);
        }
    }
`;
