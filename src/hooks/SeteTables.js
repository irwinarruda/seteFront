import React from 'react';
import {
    api,
    MUNICIPIOS_GET_ALL,
    FREE_ACCESS_FIREBASE_LIST,
} from '../services/SeteApi';
import { useErrorHandler } from './Errors';
import {
    cityTableColumns,
    cityTableDataHandle,
    freeAccessTableColumns,
    freeAccessTableDataHandle,
} from '../helpers/tableHelpers';

export const tableTypes = {
    city: {
        apiReq: MUNICIPIOS_GET_ALL,
        tableColumns: cityTableColumns,
        tableData: cityTableDataHandle,
    },
    free_access: {
        apiReq: FREE_ACCESS_FIREBASE_LIST,
        tableColumns: freeAccessTableColumns,
        tableData: freeAccessTableDataHandle,
    },
};

export const useSeteTables = (type = 'city') => {
    const { errorHandler } = useErrorHandler();

    const [data, setData] = React.useState([]);
    const [pageCount, setPageCount] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const columns = React.useMemo(() => tableTypes[type].tableColumns, []);
    const fetchIdRef = React.useRef(0);

    const fetchData = React.useCallback(
        async (pageIndex, params = {}) => {
            try {
                setLoading(true);
                const fetchId = ++fetchIdRef.current;
                const token = window.localStorage.getItem('@seteweb:token');
                const response = await api(
                    tableTypes[type].apiReq(token, {
                        pagina: pageIndex + 1,
                        ...params,
                    }),
                );
                if (fetchId !== fetchIdRef.current) return;
                const dataRaw = await response.data;
                const data = tableTypes[type].tableData(dataRaw.registros);
                setPageCount(dataRaw.pages);
                setData(data);
            } catch (err) {
                errorHandler(err, { title: 'Erro ao pegar dados' });
            } finally {
                setLoading(false);
            }
        },
        [setData, setPageCount, setLoading, fetchIdRef],
    );

    return {
        data,
        columns,
        pageCount,
        loading,
        setLoading,
        fetchData,
    };
};
