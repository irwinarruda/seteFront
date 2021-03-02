import styled from 'styled-components';

export const FreeAccessContainer = styled.div`
    width: 100%;
    height: 100%;
    padding-bottom: 60px;

    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0px 0px 10px 10px;

    .free-access-content {
        max-width: 500px;
        width: 100%;
        margin: 0 auto;

        & > h3 {
            width: 100%;
            display: block;

            font-family: var(--font-primary);
            font-weight: 400;
            color: var(--color-black);
        }

        & > form {
            max-width: 410px;
            width: 100%;
            margin: 40px auto 0px auto;

            .free-access-radio-container {
                margin-top: 20px;
                label + label {
                    margin-top: 5px;
                }
            }

            .free-access-button-container {
                margin-top: 40px;
            }
        }
    }
`;
