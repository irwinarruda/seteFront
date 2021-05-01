import { createGlobalStyle, keyframes } from 'styled-components';

export default createGlobalStyle`
    :root {
        --font-primary: 'Roboto', sans-serif;
        --color-red: #FF6161;
        --color-orange: #FCC95F;
        --color-dark-orange: #F8B01D;
        --color-yellow: #E4C949;
        --color-dark-yellow: #FBCF02;
        --color-light-blue: #4254f5;
        --color-blue: #5E7B9E;
        --color-dark-blue: #5b718b;
        --color-green: #07a43c;
        --color-dark-green: #059B38;
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
        font-size: 16px;
    }
    h1, h2, h3, h4, h5, h6 {
        display: block;
        color: var(--color-black);
        font-family: var(--font-primary);
    }
    button {
        cursor: pointer;
        font-family: var(--font-primary);
        border: none;
    }
    table {
        border: none;
    }
    th {
        font-family: var(--font-primary);
        font-size: 14px;

    }
    td {
        font-family: var(--font-primary);
        font-size: 14px;
        font-weight: 300;
    }
`;

export const infiniteLoop = keyframes`
    from { transform: rotate(0deg); }
    to {transform: rotate(360deg);}
`;

export const showIn = keyframes`
    from { opacity: 0; }
    to {opacity: 1;}
`;

export const fromTop = keyframes`
    from { top: -100%; }
    to { top: 0px; }
`;
