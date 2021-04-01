import React from 'react';
import { Container, TableContainer } from './styles';
import { useFormikContext } from 'formik';

import $ from 'jquery';
import 'datatables.net';
import './dataTableStyles.css';

import { api, FREE_ACCESS_FIREBASE_LIST } from '../../../../services/SeteApi';
import { useErrorHandler } from '../../../../hooks/Errors';

import MainBlueButton from '../../../../components/Buttons/MainBlueButton';

function TableComponent({ modalIsOpened, setModalIsOpened }) {
    const tableRef = React.useRef(null);
    const { errorHandler } = useErrorHandler();
    const { setFieldValue } = useFormikContext();

    function changeEmailField(event) {
        setModalIsOpened(true);
        setFieldValue('permission_email', event.target.innerHTML);
    }

    const handleButtonClick = React.useCallback(() => {
        setFieldValue('permission_email', '');
        setModalIsOpened(true);
    }, [setModalIsOpened]);

    React.useEffect(() => {
        async function getFirebasePermissions() {
            try {
                const token = window.localStorage.getItem('@seteweb:token');
                const response = await api(FREE_ACCESS_FIREBASE_LIST(token));
                const data = await response.data;
                const $table = $(tableRef.current);
                $table.DataTable({
                    data: data.registros,
                    columns: [
                        { data: 'nome', title: 'Nome' },
                        { data: 'email', title: 'E-mail' },
                        { data: 'localidade', title: 'Localidade' },
                    ],
                });
                $('tbody tr td:nth-child(2)').on('click', changeEmailField);
                $table.on('draw.dt', () => {
                    setTimeout(() => {
                        $('tbody tr td:nth-child(2)').on(
                            'click',
                            changeEmailField,
                        );
                    }, 100);
                });
            } catch (err) {
                errorHandler(err, { title: 'Erro ao Buscar usuários' });
            }
        }
        getFirebasePermissions();
    }, []);

    return (
        <Container modalIsOpened={modalIsOpened}>
            <TableContainer>
                <table id="example" className="display" ref={tableRef}></table>
            </TableContainer>
            <div className="button-container">
                <MainBlueButton onClick={handleButtonClick}>
                    Liberar Manualmente
                </MainBlueButton>
            </div>
        </Container>
    );
}

export default TableComponent;
