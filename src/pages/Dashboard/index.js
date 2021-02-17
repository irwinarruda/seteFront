import React from 'react';
import { Container, LeafletContainer } from './styles';
import Leaflet from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PinIcon from '../../assets/svg/pin.svg';

const mapPinIcon = Leaflet.icon({
    iconUrl: PinIcon,
    iconSize: [48, 58],
    iconAnchor: [29, 68],
    popupAnchor: [-5, -40],
});

const markers = [
    {
        coords: [-16.4, -49.15],
    },
    {
        coords: [-15.47, -47.56],
    },
    {
        coords: [-23.33, -46.38],
    },
    {
        coords: [-8.4, -34.55],
    },
    {
        coords: [-3.45, -64.3],
    },
    {
        coords: [-8.32, -39.22],
    },
];

function Dashboard() {
    const [position, setPosition] = React.useState([-15.75, -47.95]);
    const [mapZoom, setMapZoom] = React.useState(4);

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
                    {markers.map((item, index) => {
                        return (
                            <Marker
                                position={item.coords}
                                icon={mapPinIcon}
                                key={index}
                            >
                                <Popup>
                                    A pretty CSS3 popup. <br /> Easily
                                    customizable.
                                </Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>
            </LeafletContainer>
        </Container>
    );
}

export default Dashboard;
