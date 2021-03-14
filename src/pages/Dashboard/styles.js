import styled from 'styled-components';

export const Container = styled.section`
    width: 100%;
    max-width: calc(1170px + 2 * var(--padding-mobile));
    height: auto;
    padding: 0 var(--padding-mobile);
    margin: 0 auto 0 auto;

    display: block;
`;

export const BoxContainer = styled.div`
    max-width: 1030px;
    width: 100%;
    height: fit-content;
    margin: 42px auto 30px auto;

    display: flex;
    flex-direction: column;

    border: 2px solid rgba(56, 58, 58, 0.24);
    border-top: none;
    border-radius: 0px 0px 10px 10px;
    box-shadow: 0px 4px 10px 3px rgba(0, 0, 0, 0.15);
    background-color: var(--color-white);
`;
