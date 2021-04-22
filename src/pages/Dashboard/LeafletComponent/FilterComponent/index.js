import React from 'react';
import { Container } from './styles';
import { ReactSVG } from 'react-svg';
import UsersIconActive from '../../../../assets/svg/leaflet/usuarios-ativos.svg';
import UsersIconInactive from '../../../../assets/svg/leaflet/usuarios-inativos.svg';
import UsersIcon from '../../../../assets/svg/leaflet/usuarios.svg';

function FilterComponent({ markers, markerFilter, setMarkerFilter }) {
    return (
        <Container>
            <div className="general-title">
                <h2>Filtro de Instalações do SETE</h2>
            </div>
            <div className="general-info-container">
                <div className="general-info">
                    <div
                        className={`info-item${
                            markerFilter === 'totalUsers' ? ' item-active' : ''
                        }`}
                        onClick={() => setMarkerFilter('totalUsers')}
                    >
                        <div className="item-icon">
                            <ReactSVG src={UsersIcon} />
                            <h4>Total das Instalações</h4>
                        </div>
                        <div className="item-status">
                            <h3>{markers.totalUsers.count}</h3>
                        </div>
                    </div>
                    <div
                        className={`info-item${
                            markerFilter === 'activeUsers' ? ' item-active' : ''
                        }`}
                        onClick={() => setMarkerFilter('activeUsers')}
                    >
                        <div className="item-icon">
                            <ReactSVG src={UsersIconActive} />
                            <h4>Instalações em Uso</h4>
                        </div>
                        <div className="item-status">
                            <h3>{markers.activeUsers.count}</h3>
                        </div>
                    </div>
                    <div
                        className={`info-item${
                            markerFilter === 'inactiveUsers'
                                ? ' item-active'
                                : ''
                        }`}
                        onClick={() => setMarkerFilter('inactiveUsers')}
                    >
                        <div className="item-icon">
                            <ReactSVG src={UsersIconInactive} />
                            <h4>instalações sem Uso</h4>
                        </div>
                        <div className="item-status">
                            <h3>{markers.inactiveUsers.count}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default FilterComponent;
