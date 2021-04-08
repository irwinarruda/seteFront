import React from 'react';
import { Container } from './styles';
import TableComponent from './TableComponent';
import { api, MUNICIPIOS_GET_ALL } from '../../../services/SeteApi';
import { useErrorHandler } from '../../../hooks/Errors';
import { useAlertModal } from '../../../hooks/AlertModal';
import {
    cityTableDataHandle,
    cityTableColumns,
} from '../../../helpers/tableHelpers';

function CityTableComponent() {
    const { errorHandler } = useErrorHandler();
    const { createModal, clearModal } = useAlertModal();

    const [tableData, setTableData] = React.useState([]);
    const [pageCount, setPageCount] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const columns = React.useMemo(() => cityTableColumns, []);
    const fetchIdRef = React.useRef(0);

    const getCityData = React.useCallback(
        async (pageIndex) => {
            try {
                setLoading(true);
                const fetchId = ++fetchIdRef.current;
                const token = window.localStorage.getItem('@seteweb:token');
                const response = await api(
                    MUNICIPIOS_GET_ALL(token, {
                        tipo: 'lista',
                        pagina: pageIndex + 1,
                    }),
                );
                if (fetchId !== fetchIdRef.current) return;
                const dataRaw = await response.data;
                const data = cityTableDataHandle(dataRaw.registros);
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
        <Container>
            <TableComponent
                columns={columns}
                data={tableData}
                loading={loading}
                fetchData={getCityData}
                pageCount={pageCount}
            />
        </Container>
    );
}

export default CityTableComponent;
