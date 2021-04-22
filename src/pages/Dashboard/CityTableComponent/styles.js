import styled from 'styled-components';
import { showIn } from '../../../styles/global';

export const Container = styled.div`
    padding: var(--padding-mobile);
    animation: ${showIn} 0.3s ease-in;
`;

export const DownloadContainer = styled.div`
    width: 100%;
    margin-top: 45px;
    .download-button-container {
        width: 100%;
        display: block;
        text-align: center;
        button {
            color: var(--color-white);
            font-size: 16px;
            padding: 7px 30px;

            border-radius: 3px;
            background-color: #43aa8b;
            transition: all 0.1s linear;
            &:hover {
                background-color: #457b6b;
            }
        }
    }

    h3 {
        width: 100%;
        margin-top: 20px;
        text-align: center;
        font-weight: 500;
        a {
            color: var(--color-light-blue);
        }
    }
`;
