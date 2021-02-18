import styled from 'styled-components';

export const MainMenuContainer = styled.div`
    width: 100%;
    height: 100%;
`;

export const MainMenuHeaderContainer = styled.header`
    width: 100%;
    max-height: 130px;
    height: 20%;
    background-color: #383a3a;
`;
export const MainMenuHeader = styled.div`
    max-width: calc(1170px + 2 * var(--padding-mobile));
    width: 100%;
    height: 100%;
    padding: 0 var(--padding-mobile);
    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: space-between;

    & > a {
        img {
            width: 100%;
            height: 100%;
        }
    }

    & > nav {
        max-width: 290px;
        width: 100%;
        ul {
            list-style: none;
            display: flex;
            align-items: center;
            justify-content: space-between;

            li {
                a {
                    color: #ffffff;
                    font-family: 'Roboto', sans-serif;
                    font-size: 22px;
                    font-weight: 600;
                    text-decoration: none;

                    transition: all 0.2s;
                    &:hover {
                        color: #b4b4b4;
                    }
                }
            }
        }
    }

    @media (max-width: 580px) {
        flex-direction: column;

        & > nav {
            padding: 20px 0;
        }
    }
`;