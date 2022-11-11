import React from 'react';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Container } from './styles';
import TableComponent from './TableComponent';
import SeteTableComponent from './SeteTableComponent';
import ResetPasswordForm from './ResetPasswordComponent';
import { useSeteTables } from '../../../hooks/SeteTables';
import {
    seteUsersListTableColumns,
    seteUserListTableDataHandle,
    ISeteUserListData,
} from '../../../helpers/tableHelpers';

import { useErrorHandler } from '../../../hooks/Errors';
import { useAlertModal } from '../../../hooks/AlertModal';
import { api, FREE_ACCESS_FIREBASE } from '../../../services/SeteApi';
import {
    useResetPassword,
    ResetUserPasswordProvider,
} from '../../../contexts/ResetUserPasswordContext';

interface IFormikValues {
    permission_email: string;
    permission_checkbox: string;
}

export interface ICityInfo {
    codigo_municipio: string;
    nome_cidade: string;
    uf: string;
    n_escolas: string | null;
    n_alunos: string | null;
    n_veiculos_funcionamento: string | null;
    n_veiculos_manutencao: string | null;
    n_rotas: string | null;
    n_rotas_kilometragem_total: string | null;
    n_rotas_kilometragem_media: string | null;
    n_motoristas: string | null;
    n_tempo_medio_rota: string | null;
}

export interface ITableModalData {
    uid: string;
    nome: string;
    cpf: string;
    telefone: string;
    email: string;
}

const CityTableComponent: React.FC = () => {
    const { errorHandler, warningHandler } = useErrorHandler();
    const { createModal, clearModal, createModalAsync } = useAlertModal();
    const {
        columns,
        data,
        loading,
        pageCount,
        setLoading,
        fetchData,
    } = useSeteTables('city');
    const [cityInfo, setCityInfo] = React.useState<ICityInfo | null>(null);
    const { resetPassord, setResetPassord } = useResetPassword();
    const [tableModalIsOpened, setTableModalIsOpened] = React.useState<boolean>(
        false,
    );
    const [
        resetPasswordModalIsOpened,
        setResetPasswordModalIsOpened,
    ] = React.useState<boolean>(false);

    const [tableModalData, setTableModalData] = React.useState<
        Array<ITableModalData> | {}
    >({});

    async function handleFormikSubmit(
        values: IFormikValues,
        { setSubmitting, resetForm }: FormikHelpers<IFormikValues>,
    ): Promise<void> {
        try {
            createModal();
            setSubmitting(true);
            const token = window.localStorage.getItem('@seteweb:token');
            const body = {
                email: values.permission_email,
                tipo_permissao: values.permission_checkbox,
            };
            const modalCheck = await createModalAsync('warning', {
                title: 'Deseja liberar acesso para:',
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
    React.useEffect(() => {
        console.log('reset', resetPassord);
    }, [resetPassord]);
    return (
        <Container>
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
                        {!tableModalIsOpened ? (
                            <TableComponent
                                columns={columns}
                                data={data}
                                loading={loading}
                                fetchData={fetchData}
                                pageCount={pageCount}
                                setLoading={setLoading}
                                setTableModalData={setTableModalData}
                                setTableModalIsOpened={setTableModalIsOpened}
                                setCityInfo={setCityInfo}
                            />
                        ) : !!resetPassord ? (
                            <ResetPasswordForm
                                setModalIsOpened={setResetPasswordModalIsOpened}
                                modalIsOpened={resetPassord}
                                handleSubmit={handleSubmit}
                                isSubmitting={isSubmitting}
                            />
                        ) : (
                            <SeteTableComponent
                                columns={seteUsersListTableColumns}
                                data={seteUserListTableDataHandle(
                                    tableModalData as Array<ISeteUserListData>,
                                )}
                                setTableModalIsOpened={setTableModalIsOpened}
                                cityInfo={cityInfo}
                                setCityInfo={setCityInfo}
                            />
                        )}
                    </>
                )}
            </Formik>
        </Container>
    );
};

export default CityTableComponent;
