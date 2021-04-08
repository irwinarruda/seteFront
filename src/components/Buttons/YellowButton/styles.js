import styled from 'styled-components';

export const ButtonContainer = styled.button`
    display: block;
    text-align: center;
    width: 100%;
    padding: 8px 0px;
    border: none;
    background-color: #fbcf02;
    transition: all 0.2s;

    color: #ffffff;
    font-weight: 600;
    font-size: 20px;
    font-family: var(--font-primary);
    &:disabled {
        background-color: #c3b15a;
        cursor: auto;
        &:hover {
            background-color: #c3b15a;
        }
    }

    &:hover {
        background-color: #eec91d;
    }
`;
