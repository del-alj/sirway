import { useContext, useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { TramNetworkContext } from '../context/TramNetworkContext';
import { useCity } from '../context/CityContext';
import StationMarkers from './StationMarkers';
import LineLabels from './LineLabels';
import TramLines from './TramLines';
import LocationMarker from './LocationMarker';
import 'leaflet/dist/leaflet.css';

// City configurations
const CITY_CONFIG = {
  Casablanca: {
    center: [33.5731, -7.5893],
    bounds: [[33.5, -7.7], [33.65, -7.5]]
  },
  Rabat: {
    center: [34.0209, -6.8416],
    bounds: [[34.0, -6.85], [34.05, -6.75]]
  },
  'Salé': {
    center: [34.0378, -6.7985],
    bounds: [[33.99, -6.88], [34.08, -6.72]]
  }
};

// Component to handle map updates when city changes
function CityUpdater() {
  const { currentCity } = useCity();
  const map = useMap();

  // Update map view when city changes
  useEffect(() => {
    const config = CITY_CONFIG[currentCity];
    if (config) {
      map.flyTo(config.center, 14, {
        duration: 1.4,
        easeLinearity: 0.25
      });
      map.setMaxBounds(config.bounds);
    }
  }, [currentCity, map]);

  return null;
}

export default function MapView({ className }) {
  const { currentCity } = useCity();
  const { lines, stations, loading } = useContext(TramNetworkContext);
  const [zoom, setZoom] = useState(13);

  // Get current city configuration or fallback to Casa
  const cityConfig = CITY_CONFIG[currentCity] || CITY_CONFIG.Casablanca;

  if (loading) return <div className={className}>Loading map…</div>;
  if (!lines.length) return <div className={className}>No tram lines found</div>;

  return (
    <MapContainer
      className={className}
      center={cityConfig.center}
      zoom={15}
      minZoom={13}
      maxZoom={16}
      maxBounds={cityConfig.bounds}
      maxBoundsViscosity={1.0}
      style={{ height: '100%', width: '100%' }}
      whenCreated={(mapInstance) => mapInstance.on('zoomend', () => setZoom(mapInstance.getZoom()))}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {/* City-specific updates */}
      <CityUpdater />
      <TramLines lines={lines} />
      <LocationMarker />
      <StationMarkers stations={stations} zoom={zoom} />
      <LineLabels lines={lines} zoom={zoom} />

      {/* Add CSS animation */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.9); opacity: 1; }
          70% { transform: scale(1.3); opacity: 0.5; }
          100% { transform: scale(0.9); opacity: 1; }
        }
        .gps-marker div {
          animation: pulse 1.5s infinite;
        }
      `}</style>
    </MapContainer>
  );
}