import styled from 'styled-components';

export const Label = styled.label`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    font-family: var(--font-primary);
    font-size: 17px;
    font-weight: 400;
    font-family: var(--font-primary);
    color: var(--color-black);
    user-select: none;
    cursor: pointer;

    input {
        width: 0px;
        height: 0px;
        visibility: hidden;
        opacity: 0;
    }

    span {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        position: relative;

        border-radius: 50%;
        border: 1px solid rgba(0, 0, 0, 0.3);
        background-color: var(--color-white);
        transition: all 0.1s linear;

        &:after {
            transition: all 0.2s linear;
        }
    }

    &:hover {
        span {
            background-color: var(--color-darker-white);
        }
    }

    & > input:checked ~ span {
        background-color: var(--color-darker-white);
        &:after {
            content: '';
            display: block;
            position: absolute;
            top: 20%;
            left: 14%;

            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: var(--color-dark-yellow);
        }
    }
`;
