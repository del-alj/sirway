// context/CityContext.jsx
import { createContext, useState, useContext, useEffect, useRef } from 'react';

export const CityContext = createContext();

const CITY_COORDINATES = {
  Casablanca: { lat: 33.5731, lng: -7.5893 },
  Rabat: { lat: 34.0209, lng: -6.8416 },
  'Salé': { lat: 34.0378, lng: -6.7985 }
};

function haversineDistance(lat1, lon1, lat2, lon2) {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Earth radius km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function getNearestCity(lat, lng) {
  let nearestCity = 'Casablanca';
  let nearestDistance = Infinity;

  Object.entries(CITY_COORDINATES).forEach(([city, coords]) => {
    const distance = haversineDistance(lat, lng, coords.lat, coords.lng);
    if (distance < nearestDistance) {
      nearestCity = city;
      nearestDistance = distance;
    }
  });

  return nearestCity;
}

export function CityProvider({ children }) {
  const [currentCity, setCurrentCity] = useState('Casablanca');
  const hasDetectedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('geolocation' in navigator) || hasDetectedRef.current) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const nearestCity = getNearestCity(latitude, longitude);
        setCurrentCity(nearestCity);
        hasDetectedRef.current = true;
      },
      () => {
        hasDetectedRef.current = true;
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5 * 60 * 1000
      }
    );
  }, []);

  return (
    <CityContext.Provider value={{ currentCity, setCurrentCity }}>
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  return useContext(CityContext);
}