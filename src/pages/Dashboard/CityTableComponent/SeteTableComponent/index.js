import React from 'react';
import {
    Container,
    TableContainer,
    PaginationContainer,
    SearchContainer,
} from './styles';
import {
    useTable,
    useSortBy,
    usePagination,
    useGlobalFilter,
} from 'react-table';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { BsArrowLeft } from 'react-icons/bs';
import {
    IoIosArrowDropupCircle,
    IoIosArrowDropdownCircle,
    IoMdArrowDropright,
    IoMdArrowDropleft,
} from 'react-icons/io';

import TableSearchInput from '../../../../components/Inputs/TableSearchInput';

function SeteTableComponent({
    data,
    columns,
    setTableModalIsOpened,
    cityInfo,
    setCityInfo,
}) {
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
        state: { pageIndex, globalFilter },
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageSize: 10 },
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
    );

    const handleGoBackClick = React.useCallback(() => {
        setTableModalIsOpened(false);
    }, [setTableModalIsOpened]);

    return (
        <Container>
            <div className="goback-button">
                <div onClick={handleGoBackClick}>
                    <BsArrowLeft size={40} color="var(--color-black)" />
                    <h4>Voltar</h4>
                </div>
            </div>
            <div className="city-title">
                <h3>
                    {cityInfo?.nome_cidade} - {cityInfo?.uf}
                </h3>
            </div>
            <SearchContainer>
                <TableSearchInput
                    labelText="Buscar:"
                    name="table_search"
                    value={globalFilter}
                    onChange={(event) => setGlobalFilter(event.target.value)}
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
                        {page.map((row, index) => {
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
                {data.length === 0 && (
                    <div className="no-data-info">
                        <AiOutlineInfoCircle
                            size={75}
                            color="var(--color-orange)"
                        />
                        <h4>Nenhum usuário cadastrado no SETE desktop</h4>
                    </div>
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
}

export default SeteTableComponent;
