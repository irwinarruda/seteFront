import styled from 'styled-components';

export const Container = styled.section`
    width: 100%;
    max-width: calc(1170px + 2 * var(--padding-mobile));
    height: auto;
    padding: 0 var(--padding-mobile);
    margin: 0 auto;
    flex-grow: 1;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const LeafletContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;

    flex-grow: 1;
    .mapview {
        width: 100%;
        height: 100%;
    }
`;

export const BoxContainer = styled.div`
    max-width: 1030px;
    width: 100%;
    height: 700px;
    margin: 0px auto 0px auto;

    display: flex;
    flex-direction: column;

    border: 2px solid rgba(56, 58, 58, 0.24);
    border-top: none;
    border-radius: 0px 0px 10px 10px;
    box-shadow: 0px 4px 10px 3px rgba(0, 0, 0, 0.15);
    background-color: var(--color-white);
`;

export const BoxNavMenu = styled.nav`
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
`;
