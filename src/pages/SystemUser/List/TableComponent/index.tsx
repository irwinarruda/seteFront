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

import { ISeteTables } from '../../../../hooks/SeteTables';
interface ReqParamsState {
    tipo: string;
    busca: string;
}

const TableComponent: React.FC<ISeteTables> = ({
    columns,
    data,
    loading,
    fetchData,
    pageCount: controlledPageCount,
    setLoading,
}) => {
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
                                    <tr {...row.getRowProps()} key={index}>
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
                            <h4>Nenhum usuário cadastrado no sistema</h4>
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
