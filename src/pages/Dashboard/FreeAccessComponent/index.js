import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FreeAccessContainer, FormContainer, DarkScreen } from './styles';
import TableComponent from './TableComponent';

import FormikInputRadio from '../../../components/Inputs/FormikInputRadio';
import FormikInputText from '../../../components/Inputs/FormikInputText';
import MainBlueButton from '../../../components/Buttons/MainBlueButton';

import { useErrorHandler } from '../../../hooks/Errors';
import { useAlertModal } from '../../../hooks/AlertModal';
import {
    api,
    FREE_ACCESS_FIREBASE,
    FREE_ACCESS_FIREBASE_LIST,
} from '../../../services/SeteApi';
import {
    freeAccessTableColumns,
    freeAccessTableDataHandle,
} from '../../../helpers/tableHelpers';

import { ImSpinner2 } from 'react-icons/im';
import { BsArrowLeft } from 'react-icons/bs';

function FreeAccessComponent() {
    const { errorHandler, warningHandler } = useErrorHandler();
    const { createModal, clearModal } = useAlertModal();
    const formContainerRef = React.useRef(null);

    const [modalIsOpened, setModalIsOpened] = React.useState(false);
    const [tableData, setTableData] = React.useState([]);
    const [pageCount, setPageCount] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const columns = React.useMemo(() => freeAccessTableColumns, []);
    const fetchIdRef = React.useRef(0);

    React.useEffect(() => {
        function handleClickOutside(event) {
            if (
                formContainerRef.current &&
                !formContainerRef.current.contains(event.target)
            ) {
                setModalIsOpened(false);
            }
        }
        window.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, [formContainerRef]);

    async function handleFormikSubmit(values, { setSubmitting, resetForm }) {
        try {
            createModal();
            setSubmitting(true);
            const token = window.localStorage.getItem('@seteweb:token');
            const body = {
                email: values.permission_email,
                tipo_permissao: values.permission_checkbox,
            };
            const response = await api(FREE_ACCESS_FIREBASE(body, token));
            const data = await response.data;
            warningHandler(data);
            getFreeAccessData(0);
        } catch (err) {
            errorHandler(err, { text: 'Erro ao Liberar Acesso' });
        } finally {
            clearModal();
            setSubmitting(false);
            resetForm();
        }
    }

    const handleGoBackClick = React.useCallback(() => {
        setModalIsOpened(false);
    }, [setModalIsOpened]);

    const getFreeAccessData = React.useCallback(
        async (pageIndex) => {
            try {
                setLoading(true);
                const fetchId = ++fetchIdRef.current;
                const token = window.localStorage.getItem('@seteweb:token');
                const response = await api(
                    FREE_ACCESS_FIREBASE_LIST(token, {
                        pagina: pageIndex + 1,
                    }),
                );
                if (fetchId !== fetchIdRef.current) return;
                const dataRaw = await response.data;
                const data = freeAccessTableDataHandle(dataRaw.registros);
                setPageCount(dataRaw.pages);
                setTableData(data);
            } catch (err) {
                errorHandler(err, { title: 'Errro ao pegar dados' });
            } finally {
                setLoading(false);
            }
        },
        [setTableData, setPageCount, setLoading, fetchIdRef],
    );

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
                        <TableComponent
                            setModalIsOpened={setModalIsOpened}
                            modalIsOpened={modalIsOpened}
                            fetchData={getFreeAccessData}
                            columns={columns}
                            data={tableData}
                            loading={loading}
                            pageCount={pageCount}
                        />

                        <DarkScreen modalIsOpened={modalIsOpened}>
                            <FormContainer
                                modalIsOpened={modalIsOpened}
                                ref={formContainerRef}
                            >
                                <div className="goback-button">
                                    <div onClick={handleGoBackClick}>
                                        <BsArrowLeft
                                            size={40}
                                            color="var(--color-black)"
                                        />
                                        <h4>Voltar</h4>
                                    </div>
                                </div>
                                <h3>
                                    Nessa sessão você poderá liberar acesso ao
                                    software SETE dos emails solicitados à FCT.
                                </h3>
                                <Form onSubmit={handleSubmit}>
                                    <FormikInputText
                                        type="text"
                                        labelText="E-mail"
                                        name="permission_email"
                                    />
                                    <div className="free-access-radio-container">
                                        <FormikInputRadio
                                            name="permission_checkbox"
                                            labelText="Leitor"
                                            value="reader"
                                        />
                                        <FormikInputRadio
                                            name="permission_checkbox"
                                            labelText="Administrador"
                                            value="admin"
                                        />
                                    </div>
                                    <div className="free-access-button-container">
                                        {isSubmitting ? (
                                            <ImSpinner2
                                                size={40}
                                                color="#FBCF02"
                                                style={{ marginBottom: '0px' }}
                                            />
                                        ) : (
                                            <MainBlueButton type="submit">
                                                Liberar Acesso
                                            </MainBlueButton>
                                        )}
                                    </div>
                                </Form>
                            </FormContainer>
                        </DarkScreen>
                    </>
                )}
            </Formik>
        </FreeAccessContainer>
    );
}

export default FreeAccessComponent;
