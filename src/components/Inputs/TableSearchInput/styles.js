import styled from 'styled-components';
import { DebounceInput } from 'react-debounce-input';

export const InputContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Label = styled.label`
    margin-left: 2px;

    color: var(--color-black);
    font-weight: 500;
    font-family: var(--font-primary);
    font-size: 20px;
`;

export const Input = styled.input`
    display: block;
    width: 100%;
    padding: 5px 10px;
    background: var(--color-white);
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 5px;

    font-size: 14px;
    font-weight: 300;
    font-family: var(--font-primary);
    transition: all 0.1s linear;

    &:focus {
        border-color: var(--color-dark-yellow);
    }
`;
