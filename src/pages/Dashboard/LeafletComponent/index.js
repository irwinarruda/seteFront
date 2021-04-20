import React from 'react';
import { LeafletContainer } from './styles';
import ModalComponent from './ModalComponent';

import { useAuth } from '../../../hooks/AuthContex';
import { useAlertModal } from '../../../hooks/AlertModal';
import { useErrorHandler } from '../../../hooks/Errors';
import {
    api,
    MUNICIPIOS_GET_ALL,
    MUNICIPIOS_GET_BY_ID,
} from '../../../services/SeteApi';

import { regionDivider } from '../../../helpers/regionHelpers';
import MarkerComponent from './MarkerComponent';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

function LeafletComponent() {
    const [position, setPosition] = React.useState([-15.75, -47.95]);
    const [mapZoom, setMapZoom] = React.useState(4);
    const [markers, setMarkers] = React.useState({
        Norte: [],
        Nordeste: [],
        CentroOeste: [],
        Sudeste: [],
        Sul: [],
    });
    const [modalIsOpened, setModalIsOpened] = React.useState(false);
    const [modalObj, setModalObj] = React.useState({});
    const { signOut } = useAuth();
    const { createModal, clearModal } = useAlertModal();
    const { errorHandler } = useErrorHandler();

    React.useEffect(() => {
        async function getAllCities() {
            try {
                const token = window.localStorage.getItem('@seteweb:token');
                const response = await api(MUNICIPIOS_GET_ALL(token));
                const data = await response.data;
                if (!data.result) {
                    throw { response };
                }
                const treatedData = regionDivider(data.data);
                setMarkers(treatedData);
            } catch (err) {
                errorHandler(err, { title: 'Erro ao carregar o mapa' });
            }
        }
        getAllCities();
    }, [signOut]);

    return (
        <LeafletContainer modalIsOpened={modalIsOpened}>
            <MapContainer
                className="mapview"
                center={position}
                zoom={mapZoom}
                scrollWhellZoom={false}
                minZoom={4}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MarkerComponent
                    markers={markers}
                    setModalObj={setModalObj}
                    setModalIsOpened={setModalIsOpened}
                />
            </MapContainer>
            <ModalComponent
                modalIsOpened={modalIsOpened}
                setModalIsOpened={setModalIsOpened}
                modalObj={modalObj}
                setModalObj={setModalObj}
            />
        </LeafletContainer>
    );
}

export default LeafletComponent;
