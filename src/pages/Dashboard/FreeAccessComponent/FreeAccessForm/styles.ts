import styled from 'styled-components';
import { showIn } from '../../../../styles/global';

interface IFreeAccess {
    modalIsOpened?: boolean;
}

export const Container = styled.div<IFreeAccess>`
    width: 100%;
    animation: ${showIn} 0.2s linear;
`;

export const FormContainer = styled.div<IFreeAccess>`
    max-width: 560px;
    width: 100%;
    padding: 55px 0px 75px 0px;
    margin: 0 auto;

    .goback-button {
        max-width: 100px;
        width: 100%;
        margin-top: -20px;
        & > div {
            display: flex;
            align-items: center;
            cursor: pointer;
            h4 {
                margin-left: 5px;

                font-family: var(--font-primary);
                font-weight: 500;
                color: var(--color-black);
                user-select: none;
            }
        }
    }

    & > h3 {
        width: 100%;
        display: block;
        margin-top: 10px;

        font-family: var(--font-primary);
        font-weight: 400;
        color: var(--color-black);
    }

    & > form {
        max-width: 410px;
        width: 100%;
        margin: 40px auto 0px auto;

        .free-access-radio-container {
            margin-top: 10px;
            label + label {
                margin-top: 7px;
            }
        }

        .free-access-button-container {
            margin-top: 40px;
            width: 100%;
            display: flex;
            justify-content: center;

            svg {
                text-align: center;
            }
        }
    }
`;
