// components/LineLabels.jsx
import { Fragment } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';

const createLineLabel = (lineName, lineColor, zoom) => {
  const baseSize = 36;
  const size = Math.max(baseSize, baseSize + (zoom - 13) * 3);
  const fontSize = Math.max(11, 11 + (zoom - 13) * 0.5);

  return L.divIcon({
    className: 'line-label',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    html: `
      <div style="
        background: ${lineColor};
        color: white;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: ${fontSize}px;
        letter-spacing: 0.02em;
        box-shadow: 0 10px 25px rgba(0,0,0,0.25);
        transform: translateY(-12px);
        border: 2px solid rgba(255,255,255,0.85);
      ">
        ${lineName}
      </div>
    `
  });
};

export default function LineLabels({ lines = [], zoom }) {
  if (!lines.length || zoom < 12) {
    return null;
  }

  return lines.map((line) => {
    if (!line?.coordinates?.length) return null;

    const midpointIndex = Math.floor(line.coordinates.length / 2);
    const midpoint = line.coordinates[midpointIndex];
    const cleanName = (line.name || line.id || '').split(':')[0].trim();

    if (!midpoint) return null;

    return (
      <Fragment key={`line-label-${line.id}`}>
        <Marker
          position={midpoint}
          icon={createLineLabel(cleanName, line.color, zoom)}
          zIndexOffset={1000}
          interactive={false}
        />
      </Fragment>
    );
  });
}