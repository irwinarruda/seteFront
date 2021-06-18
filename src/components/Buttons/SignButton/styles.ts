import styled from 'styled-components';

export const ButtonContainer = styled.button`
    display: block;
    text-align: center;
    width: 100%;
    max-width: 170px;
    padding: 10px 0px;
    border: none;
    background-color: #5e7b9e;
    transition: all 0.2s;

    color: #ffffff;
    font-weight: 600;
    font-size: 20px;
    font-family: var(--font-primary);

    &:disabled {
        background-color: #405267;
        color: #c8c8c8;
        cursor: wait;
        &:hover {
            background-color: #405267;
        }
    }
    &:hover {
        background-color: #5b718b;
    }
`;
