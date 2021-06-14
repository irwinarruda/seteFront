import React from 'react';
import {
    api,
    MUNICIPIOS_GET_ALL,
    FREE_ACCESS_FIREBASE_LIST,
} from '../services/SeteApi';
import { USERS_LIST } from '../services/UserApi';
import { useErrorHandler } from './Errors';
import {
    cityTableColumns,
    cityTableDataHandle,
    freeAccessTableColumns,
    freeAccessTableDataHandle,
    userListTableColumns,
    userListTableDataHandle,
} from '../helpers/tableHelpers';
import { ColumnWithLooseAccessor } from 'react-table';

export const tableTypes = {
    city: {
        apiReq: MUNICIPIOS_GET_ALL,
        tableColumns: cityTableColumns,
        tableData: cityTableDataHandle as (data: any) => axiosResponseType[],
    },
    free_access: {
        apiReq: FREE_ACCESS_FIREBASE_LIST,
        tableColumns: freeAccessTableColumns,
        tableData: freeAccessTableDataHandle as (
            data: any,
        ) => axiosResponseType[],
    },
    user_list: {
        apiReq: USERS_LIST,
        tableColumns: userListTableColumns,
        tableData: userListTableDataHandle as (
            data: any,
        ) => axiosResponseType[],
    },
};

interface ICityTableData {
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
interface IFreeAccessData {
    user_id: string;
    nome: string;
    email: string;
    localidade: string;
    acoes: JSX.Element;
}
interface IUserListData {
    nome: string;
    email: string;
    is_ativo: string;
}

type tablesType = 'city' | 'free_access' | 'user_list';
type axiosResponseType = ICityTableData | IFreeAccessData | IUserListData;

export interface ISeteTables {
    data: Array<axiosResponseType>;
    columns: Array<ColumnWithLooseAccessor<{}>>;
    pageCount: number;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    fetchData: (pageIndex: number, params?: any) => Promise<void>;
}

export const useSeteTables = (type: tablesType = 'city') => {
    const { errorHandler } = useErrorHandler();

    const [data, setData] = React.useState<axiosResponseType[]>([]);
    const [pageCount, setPageCount] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const columns = React.useMemo(() => tableTypes[type].tableColumns, []);
    const fetchIdRef = React.useRef(0);

    const fetchData = React.useCallback(
        async (pageIndex: number, params = {}): Promise<void> => {
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
                const data: axiosResponseType[] = tableTypes[type].tableData(
                    dataRaw.registros,
                );
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
