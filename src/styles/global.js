import { createGlobalStyle, keyframes } from 'styled-components';

export default createGlobalStyle`
    :root {
        --font-primary: 'Roboto', sans-serif;
        --color-red: #FF6161;
        --color-yellow: #E4C949;
        --color-dark-yellow: #FBCF02;
        --color-blue: #5E7B9E;
        --color-darker-white: #F4F4F4;
        --color-bg-white: #FAFAFA;
        --color-white: #FFFFFF;
        --color-grey-text: #808590;
        --color-bg-grey: #818181;
        --color-dark-grey: #E5E5E5;
        --color-grey: #6B6B6B;
        --color-black: #383A3A;
        --padding-mobile: 20px;
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none;
    }
    html, body, #root {
        height: 100%;
        width: 100%;
        background-color: var(--color-darker-white);
    }
    button {
        cursor: pointer;
    }
    .swal-modal {
        border: 3px solid var(--color-dark-grey);
    }
    .swal-modal .swal-icon {
        margin-top: 25px;
    }
    .swal-modal .swal-title {
        font-family: var(--font-primary);
        font-weight: 600;
        font-size: 27px;
        color: var(--color-black);
    }
    .swal-modal .swal-text {
        font-family: var(--font-primary);
        font-weight: 400;
        font-size: 16px;
    }
    .swal-footer {
        text-align: center;
    }
    .swal-footer button.swal-button--confirm {
        background-color: var(--color-blue);
        border-radius: 2px;
        padding: 13px 35px;
        transition: all 0.2s;
        font-size: 16px;
    }

    .swal-footer button.swal-button--confirm:hover {
        background-color: #5b718b;
    }

`;

export const infiniteLoop = keyframes`
    from { transform: rotate(0deg); }
    to {transform: rotate(360deg);}
`;
