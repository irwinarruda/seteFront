import React from 'react';
import {
    Container,
    LeafletContainer,
    AditionalInfo,
    LoadingScreen,
} from './styles';
import { Collapse } from 'react-collapse';
import { ReactSVG } from 'react-svg';

import { useAuth } from '../../../hooks/AuthContex';
import { useAlertModal } from '../../../hooks/AlertModal';
import { useErrorHandler } from '../../../hooks/Errors';
import { api, MUNICIPIOS_GET_ALL } from '../../../services/SeteApi';

import Spinner from '../../../assets/svg/spinner.svg';
import { AiOutlineCluster } from 'react-icons/ai';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { RiRoadMapFill } from 'react-icons/ri';
import FilterComponent from './FilterComponent';
import ModalComponent from './ModalComponent';
import MarkerComponent from './MarkerComponent';

import { regionDivider } from '../../../helpers/regionHelpers';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster.freezable';

function LeafletComponent() {
    const { signOut } = useAuth();
    const { createModal, clearModal } = useAlertModal();
    const { errorHandler } = useErrorHandler();

    const clusterMarkersRef = React.useRef([]);
    const [position, setPosition] = React.useState([-15.75, -47.95]);
    const [mapZoom, setMapZoom] = React.useState(4);
    const [markerFilter, setMarkerFilter] = React.useState('totalUsers');
    const [markers, setMarkers] = React.useState(null);

    const [modalIsOpened, setModalIsOpened] = React.useState(false);
    const [modalObj, setModalObj] = React.useState({});

    const [generalInfoIsOpened, setGeneralInfoIsOpened] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    async function getAllCities() {
        try {
            setLoading(true);
            let sessionData = window.sessionStorage.getItem(
                '@seteweb:citiesData',
            );
            if (!sessionData) {
                const token = window.localStorage.getItem('@seteweb:token');
                const response = await api(MUNICIPIOS_GET_ALL(token));
                const data = await response.data;
                if (!data.result) {
                    throw { response };
                }
                sessionData = regionDivider(data.data);
                window.sessionStorage.setItem(
                    '@seteweb:citiesData',
                    JSON.stringify(sessionData),
                );
            } else {
                sessionData = JSON.parse(sessionData);
            }
            setMarkers(sessionData);
        } catch (err) {
            errorHandler(err, { title: 'Erro ao carregar o mapa' });
        } finally {
            setLoading(false);
        }
    }
    React.useEffect(() => {
        getAllCities();
    }, [signOut]);

    const handleReClusterClick = React.useCallback(() => {
        clusterMarkersRef.current.forEach((item) => {
            item.enableClustering();
        });
    }, [clusterMarkersRef]);

    const handleGeneralInfoClick = React.useCallback(() => {
        setGeneralInfoIsOpened((prev) => !prev);
    }, [setGeneralInfoIsOpened]);

    const handleCityDataClick = React.useCallback(() => {
        window.sessionStorage.removeItem('@seteweb:citiesData');
        getAllCities();
    }, []);

    return (
        <Container>
            {markers !== null && (
                <Collapse isOpened={generalInfoIsOpened}>
                    <FilterComponent
                        markers={markers}
                        markerFilter={markerFilter}
                        setMarkerFilter={setMarkerFilter}
                    />
                </Collapse>
            )}
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
                    {markers !== null && (
                        <MarkerComponent
                            markers={markers[markerFilter]}
                            setModalObj={setModalObj}
                            setModalIsOpened={setModalIsOpened}
                            clusterMarkersRef={clusterMarkersRef}
                        />
                    )}
                </MapContainer>
                <AditionalInfo modalIsOpened={modalIsOpened}>
                    <div className="aditional-button-container">
                        <button
                            onClick={handleReClusterClick}
                            className="button-recluster"
                            disabled={modalIsOpened}
                        >
                            <AiOutlineCluster
                                size={20}
                                color="var(--color-white)"
                            />
                        </button>
                        <button
                            onClick={handleGeneralInfoClick}
                            className="button-general-info"
                            disabled={modalIsOpened}
                        >
                            <BsFillInfoCircleFill
                                size={16}
                                color="var(--color-white)"
                            />
                        </button>
                        <button
                            onClick={handleCityDataClick}
                            className="button-city-data"
                            disabled={modalIsOpened || loading}
                        >
                            <RiRoadMapFill
                                size={18}
                                color="var(--color-white)"
                            />
                        </button>
                    </div>
                </AditionalInfo>
                {loading && (
                    <LoadingScreen>
                        <ReactSVG src={Spinner} />
                    </LoadingScreen>
                )}

                <ModalComponent
                    modalIsOpened={modalIsOpened}
                    setModalIsOpened={setModalIsOpened}
                    modalObj={modalObj}
                    setModalObj={setModalObj}
                />
            </LeafletContainer>
        </Container>
    );
}

export default LeafletComponent;
