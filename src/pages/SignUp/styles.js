import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const SignUpContainer = styled.div`
    max-width: 530px;
    width: 100%;
    padding: 5px 70px 50px 70px;

    background-color: #f4f4f4;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
    border-radius: 5px;

    & > div {
        width: 100%;
        text-align: center;
        img {
            width: 70%;
        }
    }

    & > form > div {
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

            a {
                text-decoration: underline;
                margin-top: 7px;

                color: #383a3a;
                font-family: 'Roboto', sans-serif;
                font-size: 16px;
                font-weight: 400;
            }
        }
    }

    @media (max-width: 500px) {
        padding: 5px 30px 50px 30px;
    }
    @media (max-width: 350px) {
        padding: 5px 15px 50px 15px;
    }
`;
