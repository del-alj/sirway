import React, { useContext, useMemo } from 'react';
import styled from 'styled-components';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { TramNetworkContext } from '../context/TramNetworkContext';
import { useCity } from '../context/CityContext';

const PreviewFrame = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  overflow: hidden;
  pointer-events: none;

  .leaflet-container {
    height: 100%;
    width: 100%;
    pointer-events: none;
    background: transparent;
  }

  .leaflet-control-container {
    display: none;
  }
`;

const CITY_CONFIG = {
  Casablanca: {
    center: [33.5731, -7.5893],
    zoom: 12.8,
  },
  Rabat: {
    center: [34.0209, -6.8416],
    zoom: 13,
  },
  'Salé': {
    center: [34.0378, -6.7985],
    zoom: 13,
  },
};

const HeroMapPreview = () => {
  const { currentCity } = useCity();
  const { lines = [] } = useContext(TramNetworkContext);
  const config = CITY_CONFIG[currentCity] || CITY_CONFIG.Casablanca;

  const renderedLines = useMemo(
    () =>
      lines.map((line) => (
        <Polyline
          key={`hero-line-${line.id}`}
          positions={line.coordinates}
          color={line.color || '#27C2A3'}
          weight={8}
          opacity={0.95}
          lineCap="round"
          lineJoin="round"
        />
      )),
    [lines]
  );

  return (
    <PreviewFrame>
      <MapContainer
        key={currentCity}
        center={config.center}
        zoom={config.zoom}
        preferCanvas
        zoomControl={false}
        dragging={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        touchZoom={false}
        attributionControl={false}
        keyboard={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
        {renderedLines}
      </MapContainer>
    </PreviewFrame>
  );
};

export default HeroMapPreview;
