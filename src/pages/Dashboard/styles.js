import styled from 'styled-components';

export const Container = styled.section`
    width: 100%;
    height: 85%;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const LeafletContainer = styled.div`
    width: 95%;
    height: 80%;
    position: relative;
    .mapview {
        width: 100%;
        height: 100%;
    }
    //background-color: tomato;
`;
