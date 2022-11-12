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
    Column,
    ColumnWithLooseAccessor,
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

import { useFormikContext } from 'formik';
import TableSearchInput from '../../../../components/Inputs/TableSearchInput';

import { ICityInfo } from '../../CityTableComponent';
import { ISeteUserListData } from '../../../../helpers/tableHelpers';

type clickFunction =
    | null
    | ((event: React.MouseEvent<HTMLTableDataCellElement>) => void);

interface ISeteTableComponentProps {
    columns: Array<ColumnWithLooseAccessor<{}>>;
    data: Array<Omit<ISeteUserListData, 'uid'>>;
    setTableModalIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
    setResetPassord: React.Dispatch<React.SetStateAction<boolean>>;
    cityInfo: ICityInfo | null;
    setCityInfo: React.Dispatch<React.SetStateAction<ICityInfo | null>>;
}

const SeteTableComponent: React.FC<ISeteTableComponentProps> = ({
    columns,
    data,
    setTableModalIsOpened,
    setResetPassord,
    cityInfo,
    setCityInfo,
}) => {
    const { setFieldValue } = useFormikContext();
    const handleRowClick = React.useCallback(
        (row) => {
            setFieldValue('nome', row.nome);
            setFieldValue('cpf', row.cpf.replace(/[-.]/g, ''));
            setFieldValue('telefone', row.telefone);
            setFieldValue('email', row.email);
            setFieldValue('permissao', row.nivel_permissao);
            setFieldValue('password', '');
            setFieldValue('confirm_password', '');
            setFieldValue('id_usuario', row.id_usuario);
            setFieldValue('codigo_cidade', row.codigo_cidade);

            setResetPassord(true);
        },
        [setFieldValue, setResetPassord],
    );

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
        state: { pageIndex, globalFilter = '' },
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            initialState: {
                pageSize: 10,
                hiddenColumns: [
                    'nivel_permissao',
                    'id_usuario',
                    'codigo_cidade',
                ],
            },
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
                <h4>{cityInfo?.codigo_municipio}</h4>
            </div>
            <SearchContainer>
                <TableSearchInput
                    labelText="Buscar:"
                    name="table_search"
                    value={globalFilter}
                    onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                    ): void => {
                        setGlobalFilter(event.target.value);
                    }}
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
                                        let clickEvent: clickFunction = null;
                                        if (index === 4) {
                                            clickEvent = () => {
                                                handleRowClick(row.values);
                                            };
                                        }
                                        return (
                                            <td
                                                {...cell.getCellProps()}
                                                onClick={
                                                    clickEvent as (
                                                        event: React.MouseEvent<HTMLTableDataCellElement>,
                                                    ) => void
                                                }
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
                        <h4>Nenhum usuário liberado para este município</h4>
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
};

export default SeteTableComponent;
