import React from 'react';
import { Container } from './styles';
import TableComponent from './TableComponent';
import { useSeteTables } from '../../../hooks/SeteTables';

function List() {
    const {
        columns,
        data,
        loading,
        pageCount,
        setLoading,
        fetchData,
    } = useSeteTables('user_list');

    return (
        <Container>
            <TableComponent
                columns={columns}
                data={data}
                loading={loading}
                fetchData={fetchData}
                pageCount={pageCount}
                setLoading={setLoading}
            />
        </Container>
    );
}

export default List;
