import styled from 'styled-components';

export const ButtonContainer = styled.button`
    display: block;
    text-align: center;
    width: 100%;
    max-width: 185px;
    padding: 10px 0px;
    border: none;
    background-color: #5e7b9e;
    transition: all 0.2s;

    color: #ffffff;
    font-weight: 600;
    font-size: 24px;
    font-family: 'Roboto', sans-serif;

    &:hover {
        background-color: #5b718b;
    }
`;
