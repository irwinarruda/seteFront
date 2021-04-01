import styled from 'styled-components';
import { showIn } from '../../styles/global';

export const Container = styled.div`
    animation: ${showIn} 0.3s ease-in;
    padding: var(--padding-mobile);
`;

export const TableContainer = styled.div`
    overflow-x: auto;
    .dataTables_length {
        label {
            font-family: var(--font-primary);
            font-size: 12px;
            font-weight: 500;
            text-transform: uppercase;
            color: #9a9a9a;

            select {
                background-color: #ffffff;
                border: 2px solid #e3e3e3;
                border-radius: 4px;
                font-size: 14px;
                font-family: var(--font-primary);
                color: #565656;
            }
        }
    }

    .dataTables_paginate.paging_simple_numbers {
        font-family: var(--font-primary);
        margin-top: 10px;

        & > .paginate_button {
            border: none;
            &:hover {
                background: none;
                border: none;
                color: var(--color-black) !important;
            }
        }
        span {
            a {
                border-radius: 50%;
                background: #fff;
                border: 1px solid #ddd;
                color: var(--color-black);

                margin-left: 5px;
                padding: 8px 12px;

                &:hover {
                    background: #ddd;
                    color: var(--color-black) !important;
                    border: 1px solid #ddd;
                }

                &.current {
                    background: #23ccef;
                    border: 1px solid #23ccef;
                    color: #ffffff !important;

                    &:hover {
                        background: #23ccef;
                        color: #ffffff !important;
                        border: 1px solid #23ccef;
                    }
                }
            }
        }
    }

    table.dataTable {
        thead {
            tr {
                th {
                    border-bottom: 4px solid #8a99a7;
                    text-transform: uppercase;
                    color: #9a9a9a;
                }
            }
        }

        tbody {
            tr {
                height: 50px;
                td {
                    border-top: 1px solid #e3e3e3;

                    &.sorting_1 {
                        background-color: initial !important;
                    }
                }

                &:hover {
                    background-color: rgb(229, 229, 229, 0.6);
                }
            }

            & > tr.odd {
                background-color: rgb(229, 229, 229, 0.3);

                &:hover {
                    background-color: rgb(229, 229, 229, 0.6);
                }
            }
        }

        &.dataTable.no-footer {
            border-bottom: none;
        }
    }
`;
