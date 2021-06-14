import React from 'react';

import { useErrorHandler } from './Errors';
import { useAlertModal } from './AlertModal';
import { api, FREE_ACCESS_FIREBASE_DELETE } from '../services/SeteApi';

export function useTdHelpers() {
    const { errorHandler } = useErrorHandler();
    const { clearModal, createModal, createModalAsync } = useAlertModal();
    const removeFromList = React.useCallback(
        async (userId, modalText, updateList) => {
            try {
                const modalCheck = await createModalAsync('warning', {
                    title: 'Deseja remover da lista o usuário:',
                    text: modalText,
                    buttons: {
                        no: {
                            text: 'Não!',
                            value: false,
                        },
                        yes: {
                            text: 'SIM!',
                            value: true,
                        },
                    },
                    className: 'swal-buttons',
                });
                if (!modalCheck) {
                    return;
                }
                createModal();
                const token = window.localStorage.getItem('@seteweb:token');
                const response = await api(
                    FREE_ACCESS_FIREBASE_DELETE(token, userId),
                );
                const data = response.data;
                if (data.result) {
                    await createModalAsync('success', {
                        title: 'Sucesso!',
                        text: 'Usuário removido da lista com sucesso',
                    });
                    updateList();
                } else {
                    await createModalAsync('warning', {
                        title: 'Atenção!',
                        text: 'Não foi possível remover este usuário',
                    });
                }
            } catch (err) {
                errorHandler(err, {
                    title: 'Erro ao remover usuário da lista',
                });
            } finally {
                clearModal();
            }
        },
        [],
    );
    return {
        removeFromList,
    };
}
