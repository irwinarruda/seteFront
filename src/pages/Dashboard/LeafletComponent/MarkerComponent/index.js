import React from 'react';

import { useAlertModal } from '../../../../hooks/AlertModal';
import { useErrorHandler } from '../../../../hooks/Errors';
import { api, MUNICIPIOS_GET_BY_ID } from '../../../../services/SeteApi';

import MarkerClusterGroup from 'react-leaflet-markercluster';
import { Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';
import PinIcon from '../../../../assets/svg/pin.svg';
const mapPinIcon = Leaflet.icon({
    iconUrl: PinIcon,
    iconSize: [28, 38],
    iconAnchor: [14, 15],
    popupAnchor: [0, 0],
});

function MarkerComponent({ markers, setModalObj, setModalIsOpened }) {
    const { errorHandler } = useErrorHandler();
    const handleMarkerClick = React.useCallback(
        async (event, item) => {
            try {
                document.querySelector('html').style.cursor = 'progress';
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
            } finally {
                document.querySelector('html').style.cursor = 'default';
            }
        },
        [setModalIsOpened, setModalObj],
    );
    return (
        <>
            <MarkerClusterGroup
                maxClusterRadius={300}
                disableClusteringAtZoom={5}
            >
                {markers.Norte.length > 0
                    ? markers.Norte.map((item, index) => {
                          return (
                              <Marker
                                  position={[
                                      Number(item.latitude),
                                      Number(item.longitude),
                                  ]}
                                  key={index}
                                  icon={mapPinIcon}
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
            </MarkerClusterGroup>
            <MarkerClusterGroup
                maxClusterRadius={300}
                disableClusteringAtZoom={5}
            >
                {markers.Nordeste.length > 0
                    ? markers.Nordeste.map((item, index) => {
                          return (
                              <Marker
                                  position={[
                                      Number(item.latitude),
                                      Number(item.longitude),
                                  ]}
                                  key={index}
                                  icon={mapPinIcon}
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
            </MarkerClusterGroup>
            <MarkerClusterGroup
                maxClusterRadius={300}
                disableClusteringAtZoom={5}
            >
                {markers.CentroOeste.length > 0
                    ? markers.CentroOeste.map((item, index) => {
                          return (
                              <Marker
                                  position={[
                                      Number(item.latitude),
                                      Number(item.longitude),
                                  ]}
                                  key={index}
                                  icon={mapPinIcon}
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
            </MarkerClusterGroup>
            <MarkerClusterGroup
                maxClusterRadius={300}
                disableClusteringAtZoom={5}
            >
                {markers.Sudeste.length > 0
                    ? markers.Sudeste.map((item, index) => {
                          return (
                              <Marker
                                  position={[
                                      Number(item.latitude),
                                      Number(item.longitude),
                                  ]}
                                  key={index}
                                  icon={mapPinIcon}
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
            </MarkerClusterGroup>
            <MarkerClusterGroup
                maxClusterRadius={300}
                disableClusteringAtZoom={5}
            >
                {markers.Sul.length > 0
                    ? markers.Sul.map((item, index) => {
                          return (
                              <Marker
                                  position={[
                                      Number(item.latitude),
                                      Number(item.longitude),
                                  ]}
                                  key={index}
                                  icon={mapPinIcon}
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
            </MarkerClusterGroup>
        </>
    );
}

export default MarkerComponent;
