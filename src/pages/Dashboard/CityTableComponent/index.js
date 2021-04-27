import React from 'react';
import { Container } from './styles';
import TableComponent from './TableComponent';
import SeteTableComponent from './SeteTableComponent';
import { useSeteTables } from '../../../hooks/SeteTables';
import {
    seteUsersListTableColumns,
    seteUserListTableDataHandle,
} from '../../../helpers/tableHelpers';

function CityTableComponent() {
    const {
        columns,
        data,
        loading,
        pageCount,
        setLoading,
        fetchData,
    } = useSeteTables('city');
    const [cityInfo, setCityInfo] = React.useState({});
    const [tableModalIsOpened, setTableModalIsOpened] = React.useState(false);
    const [tableModalData, setTableModalData] = React.useState(null);

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
                        cityInfo={cityInfo}
                        setCityInfo={setCityInfo}
                    />
                </>
            ) : (
                <SeteTableComponent
                    columns={seteUsersListTableColumns}
                    data={seteUserListTableDataHandle(tableModalData)}
                    setTableModalIsOpened={setTableModalIsOpened}
                    cityInfo={cityInfo}
                    setCityInfo={setCityInfo}
                />
            )}
        </Container>
    );
}

export default CityTableComponent;
