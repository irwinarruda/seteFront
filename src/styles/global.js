import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    :root {
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
    }
    button {
        cursor: pointer;
    }

`;
