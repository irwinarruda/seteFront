import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FreeAccessContainer } from './styles';
import TableComponent from './TableComponent';
import FreeAccessForm from './FreeAccessForm';

import { api, FREE_ACCESS_FIREBASE } from '../../../services/SeteApi';
import { useErrorHandler } from '../../../hooks/Errors';
import { useAlertModal } from '../../../hooks/AlertModal';
import { useSeteTables } from '../../../hooks/SeteTables';

function FreeAccessComponent() {
    const { errorHandler, warningHandler } = useErrorHandler();
    const { createModal, clearModal, createModalAsync } = useAlertModal();
    const [modalIsOpened, setModalIsOpened] = React.useState(false);

    const {
        columns,
        data,
        fetchData,
        loading,
        pageCount,
        setLoading,
    } = useSeteTables('free_access');

    async function handleFormikSubmit(values, { setSubmitting, resetForm }) {
        try {
            createModal();
            setSubmitting(true);
            const token = window.localStorage.getItem('@seteweb:token');
            const body = {
                email: values.permission_email,
                tipo_permissao: values.permission_checkbox,
            };
            const modalCheck = await createModalAsync('warning', {
                title: 'Tem certeza que deseja liberar acesso para:',
                text: body.email,
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
            if (modalCheck) {
                const response = await api(FREE_ACCESS_FIREBASE(body, token));
                const data = await response.data;
                warningHandler(data);
                resetForm();
            }
        } catch (err) {
            errorHandler(err, { title: 'Erro ao Liberar Acesso' });
        } finally {
            clearModal();
            setSubmitting(false);
        }
    }

    return (
        <FreeAccessContainer>
            <Formik
                initialValues={{
                    permission_email: '',
                    permission_checkbox: 'reader',
                }}
                validationSchema={Yup.object().shape({
                    permission_email: Yup.string()
                        .required('O Email deve ser preenchido')
                        .email('O valor deve ser um email válido'),
                })}
                onSubmit={handleFormikSubmit}
            >
                {({ handleSubmit, isSubmitting }) => (
                    <>
                        {modalIsOpened ? (
                            <FreeAccessForm
                                setModalIsOpened={setModalIsOpened}
                                modalIsOpened={modalIsOpened}
                                handleSubmit={handleSubmit}
                                isSubmitting={isSubmitting}
                            />
                        ) : (
                            <TableComponent
                                setModalIsOpened={setModalIsOpened}
                                modalIsOpened={modalIsOpened}
                                columns={columns}
                                data={data}
                                loading={loading}
                                fetchData={fetchData}
                                pageCount={pageCount}
                                setLoading={setLoading}
                            />
                        )}
                    </>
                )}
            </Formik>
        </FreeAccessContainer>
    );
}

export default FreeAccessComponent;
