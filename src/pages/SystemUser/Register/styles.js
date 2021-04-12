import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    height: auto;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const SignUpContainer = styled.div`
    max-width: 600px;
    width: 100%;
    padding: 5px 50px 50px 50px;
    margin: 30px auto 0px auto;

    & > div {
        & > h3 {
            width: 100%;
            display: block;
            margin-top: 10px;

            font-family: var(--font-primary);
            font-weight: 400;
            color: var(--color-black);
        }
    }

    & > form > div {
        max-width: 410px;
        width: 100%;
        margin: 40px auto 0px auto;
        & + div {
            margin-top: 10px;
        }
        &:last-child {
            width: 100%;
            margin-top: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }
    }

    @media (max-width: 500px) {
        padding: 5px 30px 50px 30px;
    }
    @media (max-width: 400px) {
        padding: 5px 15px 50px 15px;
    }
`;
