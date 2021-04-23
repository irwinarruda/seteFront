import React from 'react';
import { Container } from './styles';
import TableComponent from './TableComponent';
import SeteTableComponent from './SeteTableComponent';
import { useSeteTables } from '../../../hooks/SeteTables';
import {
    seteUsersListTableColumns,
    seteUserListTableDataHandle,
} from '../../../helpers/tableHelpers';

import { api, BASE_URL, MUNICIPIOS_GET_ALL } from '../../../services/SeteApi';
import { useErrorHandler } from '../../../hooks/Errors';
import { useAlertModal } from '../../../hooks/AlertModal';

function CityTableComponent() {
    const {
        columns,
        data,
        loading,
        pageCount,
        setLoading,
        fetchData,
    } = useSeteTables('city');
    const { errorHandler } = useErrorHandler();
    const { createModal, clearModal, createModalAsync } = useAlertModal();
    const [downloadLink, setDownloadLink] = React.useState('');
    const [tableModalIsOpened, setTableModalIsOpened] = React.useState(false);
    const [tableModalData, setTableModalData] = React.useState(null);

    async function handleGenerateTableClick() {
        try {
            createModal('loading', {
                title: 'Gerando Tabela',
                text: 'Este procedimento pode ser demorado!',
            });
            const token = localStorage.getItem('@seteweb:token');
            const response = await api(
                MUNICIPIOS_GET_ALL(token, { tipo: 'excel' }),
            );
            const data = await response.data;
            setDownloadLink(`${BASE_URL}/${data.file}`);
            await createModalAsync('success', {
                title: 'Tabela gerada com sucesso!',
            });
            window.open(`${BASE_URL}/${data.file}`, '_blanc');
        } catch (err) {
            errorHandler(err, { title: 'Erro ao gerar Tabela!' });
        } finally {
            clearModal();
        }
    }

    return (
        <Container>
            {!tableModalIsOpened ? (
                <>
                    <TableComponent
                        columns={columns}
                        data={data}
                        loading={loading}
                        fetchData={fetchData}
                        pageCount={pageCount}
                        setLoading={setLoading}
                        setTableModalData={setTableModalData}
                        setTableModalIsOpened={setTableModalIsOpened}
                        setDownloadLink={setDownloadLink}
                    />
                </>
            ) : (
                <SeteTableComponent
                    columns={seteUsersListTableColumns}
                    data={seteUserListTableDataHandle(tableModalData)}
                    setTableModalIsOpened={setTableModalIsOpened}
                />
            )}
        </Container>
    );
}

export default CityTableComponent;
