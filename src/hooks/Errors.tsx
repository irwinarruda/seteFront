import React from 'react';
import { ButtonList } from 'sweetalert/typings/modules/options/buttons';
import { ContentOptions } from 'sweetalert/typings/modules/options/content';
import { useAuth } from './AuthContex';
import { useAlertModal } from './AlertModal';

interface IErrorHandler {
    warningHandler: (data: any) => Promise<void>;
    errorHandler: (err: any, options: SwalOptions) => void;
}
export interface SwalOptions {
    title?: string;
    text?: string;
    icon?: string;
    buttons?: ButtonList | Array<string | boolean>;
    content?: ContentOptions;
    className?: string;
    closeOnClickOutside?: boolean;
    closeOnEsc?: boolean;
    dangerMode?: boolean;
    timer?: number;
}

export const useErrorHandler = (): IErrorHandler => {
    const { createModal, createModalAsync } = useAlertModal();
    const { signOut } = useAuth();

    const warningHandler = React.useCallback(
        async (data: any): Promise<void> => {
            if (!data.result) {
                await createModalAsync('warning', {
                    title: 'Atenção!',
                    text: data.messages,
                });
            } else {
                await createModalAsync('success', {
                    title: 'Sucesso!',
                    text: data.messages,
                });
            }
        },
        [],
    );

    const errorHandler = React.useCallback(
        (err: any, options: SwalOptions): void => {
            let errorMessage;

            if (err.response) {
                errorMessage = Array.isArray(err.response.data.messages)
                    ? err.response.data.messages[0]
                    : err.response.data.messages ||
                      err.response.status + ': ' + err.response.statusText;

                switch (err.response.status) {
                    case 401:
                        signOut();
                        break;
                    default:
                        break;
                }
            } else if (err.request) {
                errorMessage = 'Não conseguimos nos conectar ao servidor.';
            } else {
                errorMessage = err.messages;
            }

            createModal('error', {
                title: options.title || 'Erro!',
                text: errorMessage,
            });
        },
        [],
    );

    return { errorHandler, warningHandler };
};
