import React from 'react';
import { Container } from './styles';
import TableComponent from './TableComponent';
import { useSeteTables } from '../../../hooks/SeteTables';

function CityTableComponent() {
    const {
        columns,
        data,
        loading,
        pageCount,
        setLoading,
        fetchData,
    } = useSeteTables('city');

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

export default CityTableComponent;
