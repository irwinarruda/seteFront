import styled from 'styled-components';

export const Container = styled.section`
    width: 100%;
    max-width: calc(1170px + 2 * var(--padding-mobile));
    height: 85%;
    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const LeafletContainer = styled.div`
    width: 80%;
    height: 80%;
    position: relative;
    .mapview {
        width: 100%;
        height: 100%;
    }
    //background-color: tomato;
`;
