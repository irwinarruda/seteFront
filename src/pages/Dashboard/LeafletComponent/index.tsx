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

import { regionDivider, ISeteUsageData } from '../../../helpers/regionHelpers';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster.freezable';

export interface IModalCity {
    codigo_municipio: string;
    nome_cidade: string;
    latitude: string;
    longitude: string;
    codigo_ibge: string;
    nome_estado: string;
    uf: string;
    data: {
        n_escolas: string | null;
        n_alunos: string | null;
        n_veiculos_funcionamento: string | null;
        n_veiculos_manutencao: string | null;
        n_rotas: string | null;
        n_rotas_kilometragem_total: string | null;
        n_rotas_kilometragem_media: string | null;
        n_tempo_medio_rota: string | null;
    };
}

const LeafletComponent: React.FC = () => {
    const { signOut } = useAuth();
    const { createModal, clearModal } = useAlertModal();
    const { errorHandler } = useErrorHandler();

    const clusterMarkersRef = React.useRef<Array<any>>([]);
    const [position, setPosition] = React.useState<[number, number]>([
        -15.75,
        -47.95,
    ]);
    const [mapZoom, setMapZoom] = React.useState<number>(4);
    const [markerFilter, setMarkerFilter] = React.useState<
        keyof ISeteUsageData
    >('totalUsers');
    const [markers, setMarkers] = React.useState<ISeteUsageData | null>(null);

    const [modalIsOpened, setModalIsOpened] = React.useState<boolean>(false);
    const [modalObj, setModalObj] = React.useState<IModalCity | null>(null);

    const [
        generalInfoIsOpened,
        setGeneralInfoIsOpened,
    ] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);

    async function getAllCities() {
        try {
            setLoading(true);
            let sessionData:
                | ISeteUsageData
                | string
                | null = window.sessionStorage.getItem('@seteweb:citiesData');
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
            setMarkers(sessionData as ISeteUsageData);
        } catch (err) {
            errorHandler(err, { title: 'Erro ao carregar o mapa' });
        } finally {
            setLoading(false);
        }
    }
    React.useEffect(() => {
        getAllCities();
    }, []);

    const handleReClusterClick = React.useCallback((): void => {
        clusterMarkersRef.current.forEach((item) => {
            item.enableClustering();
        });
    }, [clusterMarkersRef]);

    const handleGeneralInfoClick = React.useCallback((): void => {
        setGeneralInfoIsOpened((prev) => !prev);
    }, [setGeneralInfoIsOpened]);

    const handleCityDataClick = React.useCallback((): void => {
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
                />
            </LeafletContainer>
        </Container>
    );
};

export default LeafletComponent;
