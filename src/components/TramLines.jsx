// src/components/TramLines.jsx
import { Polyline } from 'react-leaflet';

export default function TramLines({ lines }) {
  return lines?.map((line) => (
    <Polyline
      key={line?.id}
      positions={line?.coordinates}
      color={line?.color || '#666'}
      weight={6}
      opacity={0.9}
      dashArray={line?.dashArray || null}
      lineCap="round"
      lineJoin="round"
      pane="overlayPane"
    />
  ));
}