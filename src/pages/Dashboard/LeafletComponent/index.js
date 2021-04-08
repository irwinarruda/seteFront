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

import Leaflet from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PinIcon from '../../../assets/svg/pin.svg';
const mapPinIcon = Leaflet.icon({
    iconUrl: PinIcon,
    iconSize: [28, 38],
    iconAnchor: [14, 15],
    popupAnchor: [0, 0],
});

function LeafletComponent() {
    const [position, setPosition] = React.useState([-15.75, -47.95]);
    const [mapZoom, setMapZoom] = React.useState(4);
    const [markers, setMarkers] = React.useState([]);
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
                setMarkers(data.data);
            } catch (err) {
                errorHandler(err, { title: 'Erro ao carregar o mapa' });
            }
        }
        getAllCities();
    }, [signOut]);

    const handleMarkerClick = React.useCallback(
        async (event, item) => {
            try {
                const token = window.localStorage.getItem('@seteweb:token');
                const response = await api(
                    MUNICIPIOS_GET_BY_ID(item.codigo_municipio, token),
                );
                const data = await response.data;
                setModalObj(data);
                setModalIsOpened(true);
            } catch (err) {
                errorHandler(err, {
                    title: 'Erro ao Buscar dados do município',
                });
            }
        },
        [setModalIsOpened],
    );

    return (
        <LeafletContainer modalIsOpened={modalIsOpened}>
            <MapContainer
                className="mapview"
                center={position}
                zoom={mapZoom}
                scrollWhellZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {markers.length > 0
                    ? markers.map((item, index) => {
                          return (
                              <Marker
                                  position={[
                                      Number(item.latitude),
                                      Number(item.longitude),
                                  ]}
                                  icon={mapPinIcon}
                                  key={index}
                                  eventHandlers={{
                                      click: (event) =>
                                          handleMarkerClick(event, item),
                                  }}
                              >
                                  <Popup onClick={handleMarkerClick}>
                                      {item.nome_cidade}-{item.uf}
                                  </Popup>
                              </Marker>
                          );
                      })
                    : null}
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
