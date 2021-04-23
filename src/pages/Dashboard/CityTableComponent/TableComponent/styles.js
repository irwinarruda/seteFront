import styled from 'styled-components';

export const TableContainer = styled.div`
    width: 100%;
    overflow-x: auto;
    table {
        font-size: 16px;
        font-weight: normal;
        border: none;
        border-collapse: collapse;
        width: 100%;
        white-space: nowrap;
        background-color: var(--color-white);
    }

    table td,
    table th {
        font-size: 16px;
        text-align: center;
        padding: 15px 10px;
    }

    thead {
        border-bottom: 4px solid var(--color-blue);
        tr {
            &:nth-child(odd) {
                background: var(--color-white);
            }
            th {
                user-select: none;
                font-weight: 500;
                text-transform: uppercase;
                color: #9a9a9a;
                background: var(--color-white);

                & > span {
                    margin-left: 5px;
                    position: relative;
                    top: 3px;
                }
            }
        }
    }

    tbody {
        tr {
            cursor: pointer;
            transition: all 0.05s linear;
            & + tr {
                border-top: 1px solid #e6e6e6;
            }
            &:hover {
                background-color: #e5e5e5;
            }
            &:nth-child(odd) {
                background: #f8f8f8;
                &:hover {
                    background-color: #e5e5e5;
                }
            }
        }
        & > div {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
`;

export const SearchContainer = styled.div`
    width: 100%;
    margin: 0px 0px 10px 0px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    & > div {
        max-width: 330px;
        label {
            font-size: 18px;
            margin-right: 20px;
        }
    }

    .download-button-container {
        display: block;
        text-align: center;
        button {
            color: var(--color-white);
            font-size: 16px;
            padding: 6px 30px;

            border-radius: 3px;
            background-color: #43aa8b;
            transition: all 0.1s linear;
            &:hover {
                background-color: #457b6b;
            }
        }
    }
`;

export const PaginationContainer = styled.div`
    width: 100%;
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
        padding: 3px 10px;
        border-radius: 7px;

        color: var(--color-white);
        font-weight: 600;
        font-size: 30px;

        border: none;
        background-color: #fbcf02;

        display: flex;
        align-items: center;
        justify-content: center;

        &:disabled {
            background-color: #c3b15a;
            cursor: auto;
            &:hover {
                background-color: #c3b15a;
            }
        }

        &:hover {
            background-color: #fac400;
        }
    }

    .pagination-back,
    .pagination-front {
        display: flex;
        align-items: center;
        & > button {
            & + button {
                margin-left: 5px;
            }
        }
    }

    .pagination-info {
        margin: 0px 30px;
        font-family: var(--font-primary);
        font-size: 16px;
    }

    @media (max-width: 500px) {
        .pagination-back,
        .pagination-front {
            & > button {
                & + button {
                    margin-left: 3px;
                }
            }
        }
        .pagination-info {
            margin: 0px 10px;
        }
    }
`;

export const Container = styled.div`
    width: 100%;
`;
