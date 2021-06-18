import styled from 'styled-components';
import { showIn } from '../../../../styles/global';

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
        padding: 15px 5px;
        @media (max-width: 1100px) {
        }
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
            cursor: default;
            transition: all 0.05s linear;
            & + tr {
                border-top: 1px solid #e6e6e6;
            }
            &:nth-child(odd) {
                background: #f8f8f8;
                &:hover {
                    background-color: #e5e5e5;
                }
            }
            &:hover {
                background-color: #e5e5e5;
            }
            td {
                &:nth-child(2) {
                    &:hover {
                        cursor: pointer;
                        background-color: #fbcf02;
                        color: var(--color-white);
                        text-decoration: underline;
                        font-weight: 400;
                    }
                }
                &:nth-child(4) {
                    &:hover {
                        cursor: pointer;
                    }
                }
            }
        }
        & > div {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    .no-data-info {
        width: 100%;
        margin: 40px auto 30px auto;
        svg {
            display: block;
            margin: 0 auto;
        }
        h4 {
            display: block;
            text-align: center;
            font-weight: 500;
            font-size: 19px;
            color: var(--color-orange);
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

export const SearchContainer = styled.div`
    max-width: 330px;
    width: 100%;
    margin: 0px auto 10px 0px;
    & > div {
        label {
            font-size: 18px;
            margin-right: 20px;
        }
    }
`;

export const Container = styled.div`
    width: 100%;
    animation: ${showIn} 0.2s linear;

    .button-container {
        margin: 30px auto 0px auto;
        max-width: 500px;
        width: 100%;
    }
`;
