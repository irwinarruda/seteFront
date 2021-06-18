import styled from 'styled-components';
import { infiniteLoop } from '../../styles/global';

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    height: auto;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const SignInContainer = styled.div`
    max-width: 470px;
    width: 100%;
    padding: 5px 50px 50px 50px;
    margin: 30px 0px;

    background-color: #f4f4f4;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
    border-radius: 5px;

    & > div {
        width: 100%;
        text-align: center;
        img {
            width: 70%;
        }
    }

    & > form > div {
        & + div {
            margin-top: 7px;
        }
        &:last-child {
            width: 100%;
            margin-top: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            svg {
                animation: ${infiniteLoop} 1.2s infinite;
            }

            a {
                text-decoration: underline;
                margin-top: 7px;

                color: #383a3a;
                font-family: var(--font-primary);
                font-size: 16px;
                font-weight: 400;
            }
        }
    }

    @media (max-width: 500px) {
        padding: 5px 30px 50px 30px;
    }
    @media (max-width: 400px) {
        padding: 5px 15px 50px 15px;
    }
`;
