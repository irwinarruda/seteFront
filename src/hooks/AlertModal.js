import React from 'react';
import swal from 'sweetalert';
import Spinner from '../assets/svg/spinner.svg';
import { createGlobalStyle } from 'styled-components';

export const alertTypes = {
    loading: {
        title: 'Carregando...',
        text: 'Procurando e carregando dados',
        icon: Spinner,
        className: 'swal-custom-loading',
        closeOnClickOutside: false,
    },
    success: {
        icon: 'success',
    },
    error: {
        icon: 'error',
    },
    warning: {
        icon: 'warning',
    },
    info: {
        icon: 'info',
    },
};

export function useAlertModal() {
    const createModal = React.useCallback((type, options = {}) => {
        let swalObject = {
            ...alertTypes[type || 'loading'],
            ...options,
        };
        swal(swalObject);
    });
    const createModalAsync = React.useCallback(async (type, options = {}) => {
        let swalObject = {
            ...alertTypes[type || 'loading'],
            ...options,
        };
        return await swal(swalObject);
    });
    const clearModal = React.useCallback(() => {
        swal.close();
    });

    return { createModal, clearModal, createModalAsync };
}

export const AlertModalStyles = createGlobalStyle`
    .swal-modal {
        border: 3px solid var(--color-dark-grey);
        & > .swal-icon {
            margin-top: 25px;
        }
        & > .swal-title {
            font-family: var(--font-primary);
            font-weight: 600;
            font-size: 27px;
            color: var(--color-black);
        }
        & > .swal-text {
            font-family: var(--font-primary);
            font-weight: 400;
            font-size: 16px;
        }

        & > .swal-footer {
            text-align: center;
            button {
                background-color: var(--color-blue);
                border-radius: 2px;
                padding: 13px 35px;
                transition: all 0.2s;
                font-size: 16px;
                &:hover {
                    background-color: #5b718b;
                }
            }
        }
    }
    .swal-custom-loading {
        width: 350px;
        & > .swal-icon {
            user-select: none;
            margin-top: 0px;
            width: 180px;
            & > img {
                margin-bottom: -35px;
            }
        }
        & > .swal-title {
            user-select: none;
            color: var(--color-black);
        }
        & > .swal-text {
            user-select: none;
            margin-bottom: 40px;
            color: var(--color-black);
        }
        & > .swal-footer {
            display: none;
        }
    }

    .swal-buttons {
        & > .swal-footer {
            .swal-button-container {
                button {
                    border-radius: 2px;
                    padding: 13px 35px;
                    transition: all 0.2s;
                    font-size: 16px;
                }
                &:first-child {
                    button {
                        background-color: var(--color-red);
                        &:hover {
                            background-color: #FD2A2A;
                        }
                    }
                }
            }
        }
    }

`;
