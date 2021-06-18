import React from 'react';
import { Container } from './styles';
import TableComponent from './TableComponent';
import SeteTableComponent from './SeteTableComponent';
import { useSeteTables } from '../../../hooks/SeteTables';
import {
    seteUsersListTableColumns,
    seteUserListTableDataHandle,
    ISeteUserListData,
} from '../../../helpers/tableHelpers';

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
    const [tableModalData, setTableModalData] = React.useState<
        Array<ITableModalData> | {}
    >({});

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
                        setCityInfo={setCityInfo}
                    />
                </>
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
        </Container>
    );
};

export default CityTableComponent;
