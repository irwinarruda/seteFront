import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    :root {
        --font-primary: 'Roboto', sans-serif;
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

`;
