import React from 'react';
import {
    Container,
    TableContainer,
    PaginationContainer,
    SearchContainer,
} from './styles';
import { useTable, useSortBy, usePagination } from 'react-table';
import { ReactSVG } from 'react-svg';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import {
    IoIosArrowDropupCircle,
    IoIosArrowDropdownCircle,
    IoMdArrowDropright,
    IoMdArrowDropleft,
} from 'react-icons/io';
import debounce from 'lodash.debounce';

import Spinner from '../../../../assets/svg/spinner.svg';
import TableSearchInput from '../../../../components/Inputs/TableSearchInput';

import { api, USERS_SETE_LIST } from '../../../../services/UserApi';
import {
    api as seteApi,
    BASE_URL as SETE_BASE_URL,
    MUNICIPIOS_GET_ALL,
} from '../../../../services/SeteApi';
import { useErrorHandler } from '../../../../hooks/Errors';
import { useAlertModal } from '../../../../hooks/AlertModal';

import { ISeteTables } from '../../../../hooks/SeteTables';
import { ITableModalData, ICityInfo } from '../../CityTableComponent';

interface ITableComponentProps extends ISeteTables {
    setTableModalData: React.Dispatch<
        React.SetStateAction<Array<ITableModalData> | {}>
    >;
    setTableModalIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
    setCityInfo: React.Dispatch<React.SetStateAction<ICityInfo | null>>;
}

interface ReqParamsState {
    tipo: string;
    busca: string;
}

const TableComponent: React.FC<ITableComponentProps> = ({
    columns,
    data,
    loading,
    fetchData,
    pageCount: controlledPageCount,
    setLoading,
    setTableModalData,
    setTableModalIsOpened,
    setCityInfo,
}) => {
    const { errorHandler } = useErrorHandler();
    const { clearModal, createModal, createModalAsync } = useAlertModal();
    const [reqParams, setReqParams] = React.useState<ReqParamsState>({
        tipo: 'lista',
        busca: '',
    });
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex },
    } = useTable(
        {
            columns: columns,
            data: data,
            initialState: { pageIndex: 0 },
            manualPagination: true,
            autoResetPage: false,
            pageCount: controlledPageCount,
        },
        useSortBy,
        usePagination,
    );

    const debouncedSave = React.useCallback(
        debounce((debouncedValue: string): void => {
            gotoPage(0);
            setReqParams((prev) => ({ ...prev, busca: debouncedValue }));
        }, 300),
        [setReqParams],
    );

    const handleInputChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            setLoading(true);
            debouncedSave(event.target.value);
        },
        [],
    );

    async function handleSeteUsersSearch(cityInfo: ICityInfo): Promise<void> {
        try {
            createModal();
            const token = localStorage.getItem('@seteweb:token');
            const response = await api(
                USERS_SETE_LIST(token, cityInfo.codigo_municipio),
            );
            const data = await response.data;
            setCityInfo(cityInfo);
            setTableModalData(data.data);
            setTableModalIsOpened(true);
        } catch (err) {
            errorHandler(err, { title: 'Erro ao buscar usuários do sete' });
        } finally {
            clearModal();
        }
    }

    async function handleGenerateTableClick(): Promise<void> {
        try {
            createModal('loading', {
                title: 'Gerando Tabela',
                text: 'Este procedimento pode ser demorado!',
            });
            const token = localStorage.getItem('@seteweb:token');
            const response = await seteApi(
                MUNICIPIOS_GET_ALL(token, { tipo: 'excel' }),
            );
            const data = await response.data;
            await createModalAsync('success', {
                title: 'Tabela gerada com sucesso!',
            });
            window.open(`${SETE_BASE_URL}/${data.file}`, '_blanc');
        } catch (err) {
            errorHandler(err, { title: 'Erro ao gerar Tabela!' });
        } finally {
            clearModal();
        }
    }

    React.useEffect(() => {
        fetchData(pageIndex, reqParams);
    }, [fetchData, pageIndex, reqParams]);

    return (
        <Container>
            <SearchContainer>
                <TableSearchInput
                    labelText="Buscar:"
                    name="table_search"
                    onChange={handleInputChange}
                />
                <div className="download-button-container">
                    <button onClick={handleGenerateTableClick}>
                        Exportar Dados
                    </button>
                </div>
            </SearchContainer>
            <TableContainer>
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup, index) => (
                            <tr
                                {...headerGroup.getHeaderGroupProps()}
                                key={index}
                            >
                                {headerGroup.headers.map((column, index) => (
                                    <th
                                        {...column.getHeaderProps(
                                            column.getSortByToggleProps(),
                                        )}
                                        key={index}
                                    >
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted ? (
                                                <IoIosArrowDropdownCircle
                                                    size={18}
                                                    color="#9a9a9a"
                                                />
                                            ) : (
                                                <IoIosArrowDropupCircle
                                                    size={18}
                                                    color="#9a9a9a"
                                                />
                                            )}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {!loading &&
                            page.map((row, index) => {
                                prepareRow(row);
                                return (
                                    <tr
                                        {...row.getRowProps()}
                                        key={index}
                                        onClick={() =>
                                            handleSeteUsersSearch(
                                                row.original as ICityInfo,
                                            )
                                        }
                                    >
                                        {row.cells.map((cell, index) => {
                                            return (
                                                <td
                                                    {...cell.getCellProps()}
                                                    key={index}
                                                >
                                                    {cell.render('Cell')}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
                {loading ? (
                    <ReactSVG src={Spinner} />
                ) : (
                    data.length === 0 && (
                        <div className="no-data-info">
                            <AiOutlineInfoCircle
                                size={75}
                                color="var(--color-orange)"
                            />
                            <h4>Nenhuma cidade cadastrada</h4>
                        </div>
                    )
                )}
            </TableContainer>
            <PaginationContainer>
                <div className="pagination-back">
                    <button
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                    >
                        <MdSkipPrevious size={24} color="var(--color-white)" />
                    </button>
                    <button
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                    >
                        <IoMdArrowDropleft
                            size={24}
                            color="var(--color-white)"
                        />
                    </button>
                </div>
                <span className="pagination-info">
                    Página{' '}
                    <strong>
                        {pageIndex + 1} de {pageOptions.length}
                    </strong>
                </span>
                <div className="pagination-front">
                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                        <IoMdArrowDropright
                            size={24}
                            color="var(--color-white)"
                        />
                    </button>
                    <button
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                    >
                        <MdSkipNext size={24} color="var(--color-white)" />
                    </button>
                </div>
            </PaginationContainer>
        </Container>
    );
};

export default TableComponent;
