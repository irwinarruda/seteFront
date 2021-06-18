import React from 'react';

import { useAlertModal } from '../../../../hooks/AlertModal';
import { useErrorHandler } from '../../../../hooks/Errors';
import { api, MUNICIPIOS_GET_BY_ID } from '../../../../services/SeteApi';
import {
    regionsArr,
    regionTypesKeys,
    IDividedData,
} from '../../../../helpers/regionHelpers';
import { IModalCity } from '../../LeafletComponent';

import MarkerCluster from 'react-leaflet-markercluster';
import { Marker } from 'react-leaflet';
import Leaflet from 'leaflet';
import GreenPinIcon from '../../../../assets/svg/leaflet/green-pin.svg';
import RedPinIcon from '../../../../assets/svg/leaflet/red-pin.svg';
import BluePinIcon from '../../../../assets/svg/leaflet/blue-pin.svg';
import LightBluePinIcon from '../../../../assets/svg/leaflet/light-blue-pin.svg';

interface IMarkerClusterGroup {
    showCoverageOnHover: boolean;
    maxClusterRadius: number;
    zoomToBoundsOnClick: boolean;
    refference: (ref: any) => void;
}
const MarkerClusterGroup: React.FC<IMarkerClusterGroup> = ({
    children,
    refference,
    ...props
}) => {
    return (
        <MarkerCluster ref={refference} {...props}>
            {children}
        </MarkerCluster>
    );
};

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

interface IMarkerComponentProps {
    markers: IDividedData;
    setModalObj: React.Dispatch<React.SetStateAction<IModalCity | null>>;
    setModalIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
    clusterMarkersRef: React.MutableRefObject<Array<any>>;
}
const MarkerComponent: React.FC<IMarkerComponentProps> = ({
    markers,
    setModalObj,
    setModalIsOpened,
    clusterMarkersRef,
}) => {
    const { createModal, clearModal } = useAlertModal();
    const { errorHandler } = useErrorHandler();

    React.useEffect(() => {
        if (clusterMarkersRef.current) {
            clusterMarkersRef.current.forEach((item) => {
                item.on('clusterclick', (a: any) => {
                    item.disableClustering();
                });
            });
        }
        return () => {
            clusterMarkersRef?.current?.forEach((item) => {
                item?.removeEventListener('clusterclick');
            });
        };
    }, [markers, clusterMarkersRef]);

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
        [setModalIsOpened, setModalObj, clearModal, createModal, errorHandler],
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
                        refference={(ref) => {
                            clusterMarkersRef.current[regionIndex] = ref;
                        }}
                    >
                        {markers[region as regionTypesKeys]?.length > 0
                            ? markers[region as regionTypesKeys]?.map(
                                  (item, index) => {
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
                                  },
                              )
                            : null}
                    </MarkerClusterGroup>
                );
            })}
        </>
    );
};

export default MarkerComponent;
