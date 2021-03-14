import styled from 'styled-components';

export const Container = styled.nav`
    width: 100%;
    display: flex;

    .box-nav-button {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 50%;
        padding: 15px 0px;
        cursor: pointer;
        border-top: 4px solid rgba(122, 122, 122, 0.67);
        background-color: var(--color-dark-grey);
        transition: all 0.1s linear;

        & > h2 {
            font-family: var(--font-primary);
            color: var(--color-grey-text);
            font-weight: 400;
            font-family: 24px;

            margin-left: 35px;
            user-select: none;
        }

        & > div {
            svg {
                fill: var(--color-grey-text);
                path {
                    fill: var(--color-grey-text);
                }
            }
        }
    }

    .box-nav-button-active {
        border-top: 4px solid var(--color-dark-yellow);
        background-color: var(--color-white);

        & > h2 {
            color: var(--color-black);
        }

        & > div {
            svg {
                fill: var(--color-black);
                path {
                    fill: var(--color-black);
                }
            }
        }
    }

    @media (max-width: 750px) {
        .box-nav-button {
            & > h2 {
                display: none;
            }
        }
    }
`;
