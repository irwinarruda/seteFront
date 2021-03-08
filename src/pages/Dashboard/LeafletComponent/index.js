import React from 'react';
import { LeafletContainer } from './styles';

import { useAuth } from '../../../context/AuthContex';
import { api, MUNICIPIOS_GET_ALL } from '../../../services/UserApi';
import swal from 'sweetalert';

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
    const { signOut, handleRequestError } = useAuth();

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
                const errorMessage = handleRequestError(err);
                await swal('Erro ao carregar o mapa', errorMessage, 'error');
            }
        }
        getAllCities();
    }, [signOut, handleRequestError]);

    return (
        <LeafletContainer>
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
                              >
                                  <Popup>
                                      {item.nome_cidade}-{item.uf}
                                  </Popup>
                              </Marker>
                          );
                      })
                    : null}
            </MapContainer>
        </LeafletContainer>
    );
}

export default LeafletComponent;
