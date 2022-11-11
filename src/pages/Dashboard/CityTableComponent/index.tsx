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
import { api, CHANGE_PASSWORD_FIREBASE } from '../../../services/SeteApi';
import {
    useResetPassword,
    ResetUserPasswordProvider,
} from '../../../contexts/ResetUserPasswordContext';

interface IFormikValues {
    password: string;
    confirm_password: string;
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
                password: values.password,
                confirm_password: values.confirm_password,
            };
            const modalCheck = await createModalAsync('warning', {
                title: 'Deseja liberar acesso para:',
                text: body.password,
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
                const response = await api(
                    CHANGE_PASSWORD_FIREBASE(body, token),
                );
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
                    password: '',
                    confirm_password: 'reader',
                }}
                validationSchema={Yup.object().shape({
                    password: Yup.string().required('Escreva uma senha'),
                    confirm_password: Yup.string().required(
                        'Ase senhas devem ser iguais',
                    ),
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
