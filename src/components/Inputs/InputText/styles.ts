import styled from 'styled-components';

export const InputContainer = styled.div`
    width: 100%;
`;

export const Label = styled.label`
    width: 100%;
    margin-left: 2px;

    color: var(--color-black);
    font-weight: 500;
    font-family: var(--font-primary);
    font-size: 20px;
`;

export const Input = styled.input`
    display: block;
    width: 100%;
    padding: 10px 15px;
    background: var(--color-white);
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 5px;

    font-size: 17px;
    font-weight: 300;
    font-family: var(--font-primary);
`;
