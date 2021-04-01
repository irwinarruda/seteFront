import React from 'react';
import { useAuth } from './AuthContex';
import { useAlertModal } from './AlertModal';

export function useErrorHandler() {
    const { createModal, createModalAsync } = useAlertModal();
    const { signOut } = useAuth();

    const warningHandler = React.useCallback(async (data) => {
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
    }, []);

    const errorHandler = React.useCallback((err, options = {}) => {
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
    });

    return { errorHandler, warningHandler };
}
