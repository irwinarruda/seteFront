import styled, { css } from 'styled-components';
import { infiniteLoop } from '../../../styles/global';
import { showIn, fromTop } from '../../../styles/global';

export const FreeAccessContainer = styled.div`
    animation: ${showIn} 0.3s ease-in;
    width: 100%;
    height: 100%;
    padding: 10px 10px;
    position: relative;
    overflow: hidden;

    border-radius: 0px 0px 10px 10px;

    .free-access-content {
        max-width: 1000px;
        width: 100%;
        margin: 0 auto;

        & > h3 {
            width: 100%;
            display: block;

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
                    animation: ${infiniteLoop} 1.2s infinite;
                }
            }
        }
    }
`;

export const DarkScreen = styled.div`
    width: 100%;
    height: inherit;

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 0px;
    left: 0px;
    transition: all 0.2s ease-out;
    ${(props) =>
        props.modalIsOpened
            ? 'visibility: visible; opacity: 1;'
            : 'visibility: hidden; opacity: 0;'}

    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 0px 0px 10px 10px;
`;

export const FormContainer = styled.div`
    max-width: 550px;
    width: 100%;
    height: fit-content;
    margin: 0px auto 30px auto;
    padding: 70px;

    /* position: absolute;
    top: 50%;
    right: 50%;
    transform: translateX(50%) translateY(-50%); */

    ${(props) =>
        props.modalIsOpened
            ? 'visibility: visible; opacity: 1;'
            : 'visibility: hidden; opacity: 0;'}

    box-sizing: content-box;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.4);
    background-color: var(--color-white);

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
                animation: ${infiniteLoop} 1.2s infinite;
            }
        }
    }

    /* @media (max-width: 745px) {
        max-width: 450px;
        padding: 70px 30px;
    }

    @media (max-width: 565px) {
        max-width: 300px;
        padding: 50px 20px;
    }

    @media (max-width: 400px) {
        max-width: 250px;
        padding: 50px 10px;
    } */
`;
