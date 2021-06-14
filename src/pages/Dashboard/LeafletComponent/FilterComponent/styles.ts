import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: var(--padding-mobile);

    border: 1px solid #c4c4c4;
    border-left: none;
    border-right: none;

    .general-title {
        width: 100%;
        h2 {
            width: 100%;
            display: block;
            text-align: center;

            color: var(--color-black);
            font-size: 30px;
            font-weight: 500;
            font-family: var(--font-primary);
        }
    }

    .general-info-container {
        .general-info {
            margin-top: 20px;

            display: flex;
            justify-content: space-around;

            .info-item {
                padding: 10px 15px;

                display: flex;
                align-items: center;

                cursor: pointer;
                background-color: var(--color-bg-white);
                border: 1px solid #c4c4c4;
                border-radius: 5px;
                .item-icon {
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    svg {
                        width: 100px;
                        height: 80px;
                    }
                    h4 {
                        color: var(--color-black);
                        font-size: 16px;
                        font-weight: 500;
                        font-family: var(--font-primary);
                    }
                }
                .item-status {
                    h3 {
                        color: var(--color-black);
                        font-size: 36px;
                        font-weight: 500;
                        font-family: var(--font-primary);
                    }
                }
                &.item-active {
                    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2);
                }
            }
        }
        @media (max-width: 850px) {
            overflow-x: auto;
            .general-info {
                width: 900px;
                padding: 5px 0px;
            }
        }
    }
`;
