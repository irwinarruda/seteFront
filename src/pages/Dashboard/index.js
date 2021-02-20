import React from 'react';
import { Container, LeafletContainer } from './styles';
import Leaflet from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useAuth } from '../../context/AuthContex';
import axios from 'axios';
import { MUNICIPIOS_GET_ALL } from '../../services/UserApi';
import PinIcon from '../../assets/svg/pin.svg';

const mapPinIcon = Leaflet.icon({
    iconUrl: PinIcon,
    iconSize: [28, 38],
    iconAnchor: [14, 15],
    popupAnchor: [0, 0],
});

function Dashboard() {
    const [position, setPosition] = React.useState([-15.75, -47.95]);
    const [mapZoom, setMapZoom] = React.useState(4);
    const [markers, setMarkers] = React.useState([]);

    const { signOut } = useAuth();

    React.useEffect(() => {
        async function getAllCities() {
            try {
                const token = window.localStorage.getItem('@seteweb:token');
                const response = await axios(MUNICIPIOS_GET_ALL(token));
                const json = await response.data;
                if (json.result) {
                    throw new Error(json.messages);
                }
                setMarkers(json.data);
            } catch (err) {
                console.error(err);
                signOut();
            }
        }
        getAllCities();
    }, [signOut]);

    return (
        <Container>
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
        </Container>
    );
}

export default Dashboard;
