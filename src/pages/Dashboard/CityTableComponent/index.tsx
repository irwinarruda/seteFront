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
import { api, CHANGE_PASSWORD_FIREBASE } from '../../../services/UserApi';

import md5 from 'md5';

interface IFormikValues {
    nome: string;
    telefone: string;
    cpf: string;
    email: string;
    permissao: string;
    password: string;
    confirm_password: string;
    codigo_cidade: string;
    id_usuario: string;
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
    nivel_permissao: string;
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

    const [tableModalIsOpened, setTableModalIsOpened] = React.useState<boolean>(
        false,
    );
    const [resetPassord, setResetPassord] = React.useState<boolean>(false);

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
                nome: values.nome,
                telefone: values.telefone,
                cpf: values.cpf,
                email: values.email,
                nivel_permissao: values.permissao,
                password: md5(values.password),
            };

            const id_usuario = Number(values.id_usuario);
            const codigo_cidade = Number(values.codigo_cidade);

            const modalCheck = await createModalAsync('warning', {
                title: 'Deseja alterar a senha do usuário:',
                text: body.nome,
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
                    CHANGE_PASSWORD_FIREBASE(
                        body,
                        codigo_cidade,
                        id_usuario,
                        token,
                    ),
                );
                const data = await response.data;
                warningHandler(data);
                resetForm();
                setResetPassord(false);
            }
        } catch (err) {
            errorHandler(err, { title: 'Erro ao Liberar Acesso' });
        } finally {
            clearModal();
            setSubmitting(false);
        }
    }

    return (
        <Container>
            <Formik
                initialValues={{
                    nome: '',
                    telefone: '',
                    cpf: '',
                    email: '',
                    permissao: '',
                    password: '',
                    confirm_password: '',
                    codigo_cidade: '',
                    id_usuario: '',
                }}
                validationSchema={Yup.object().shape({
                    password: Yup.string().required('Escreva uma senha'),
                    confirm_password: Yup.string()
                        .required('Confirme sua senha')
                        .oneOf(
                            [Yup.ref('password'), null],
                            'As senhas devem ser iguais',
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
                                setResetPassord={setResetPassord}
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
                                setResetPassord={setResetPassord}
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
