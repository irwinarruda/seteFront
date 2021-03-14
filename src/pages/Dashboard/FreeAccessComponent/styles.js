import styled from 'styled-components';
import { infiniteLoop } from '../../../styles/global';
import { showIn } from '../../../styles/global';

export const FreeAccessContainer = styled.div`
    animation: ${showIn} 0.3s ease-in;
    width: 100%;
    height: 100%;
    padding: 80px 10px;

    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0px 0px 10px 10px;

    .free-access-content {
        max-width: 500px;
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
