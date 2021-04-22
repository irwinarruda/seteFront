import React from 'react';

import { useAlertModal } from '../../../../hooks/AlertModal';
import { useErrorHandler } from '../../../../hooks/Errors';
import { api, MUNICIPIOS_GET_BY_ID } from '../../../../services/SeteApi';
import { regionsArr } from '../../../../helpers/regionHelpers';

import MarkerClusterGroup from 'react-leaflet-markercluster';
import { Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';
import GreenPinIcon from '../../../../assets/svg/leaflet/green-pin.svg';
import RedPinIcon from '../../../../assets/svg/leaflet/red-pin.svg';
import BluePinIcon from '../../../../assets/svg/leaflet/blue-pin.svg';
import LightBluePinIcon from '../../../../assets/svg/leaflet/light-blue-pin.svg';
const mapPinIconLightBlue = Leaflet.icon({
    iconUrl: LightBluePinIcon,
    iconSize: [28, 38],
    iconAnchor: [14, 15],
    popupAnchor: [0, 0],
});
const mapPinIconBlue = Leaflet.icon({
    iconUrl: BluePinIcon,
    iconSize: [28, 38],
    iconAnchor: [14, 15],
    popupAnchor: [0, 0],
});
const mapPinIconGreen = Leaflet.icon({
    iconUrl: GreenPinIcon,
    iconSize: [28, 38],
    iconAnchor: [14, 15],
    popupAnchor: [0, 0],
});
const mapPinIconRed = Leaflet.icon({
    iconUrl: RedPinIcon,
    iconSize: [28, 38],
    iconAnchor: [14, 15],
    popupAnchor: [0, 0],
});

function MarkerComponent({
    markers,
    setModalObj,
    setModalIsOpened,
    clusterMarkersRef,
}) {
    const { createModal, clearModal } = useAlertModal();
    const { errorHandler } = useErrorHandler();

    React.useEffect(() => {
        if (clusterMarkersRef.current) {
            clusterMarkersRef.current.forEach((item) => {
                item.on('clusterclick', (a) => {
                    item.disableClustering();
                    console.log(
                        'cluster ' + a.layer.getAllChildMarkers().length,
                    );
                });
            });
        }
        return () => {
            clusterMarkersRef?.current?.forEach((item) => {
                item?.removeEventListener('clusterclick');
            });
        };
    }, [markers]);

    const handleMarkerClick = React.useCallback(
        async (event, item) => {
            try {
                createModal();
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
                clearModal();
            }
        },
        [setModalIsOpened, setModalObj],
    );
    return (
        <>
            {regionsArr.map((region, regionIndex) => {
                return (
                    <MarkerClusterGroup
                        key={regionIndex}
                        showCoverageOnHover={false}
                        maxClusterRadius={5000}
                        zoomToBoundsOnClick={false}
                        ref={(ref) => {
                            clusterMarkersRef.current[regionIndex] = ref;
                        }}
                    >
                        {markers[region]?.length > 0
                            ? markers[region]?.map((item, index) => {
                                  return (
                                      <Marker
                                          position={[
                                              Number(item.latitude),
                                              Number(item.longitude),
                                          ]}
                                          key={index}
                                          icon={
                                              item.usa_sistema
                                                  ? mapPinIconLightBlue
                                                  : mapPinIconRed
                                          }
                                          eventHandlers={{
                                              click: (event) =>
                                                  handleMarkerClick(
                                                      event,
                                                      item,
                                                  ),
                                          }}
                                      />
                                  );
                              })
                            : null}
                    </MarkerClusterGroup>
                );
            })}
        </>
    );
}

export default MarkerComponent;
