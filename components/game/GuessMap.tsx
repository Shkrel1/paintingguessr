'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const correctIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'correct-marker',
});

interface GuessMapProps {
  onLocationSelect: (lat: number, lng: number) => void;
  selectedLocation: { lat: number; lng: number } | null;
  correctLocation?: { lat: number; lng: number; name: string } | null;
  showResult?: boolean;
  disabled?: boolean;
  expanded?: boolean;
  className?: string;
}

function MapClickHandler({
  onLocationSelect,
  disabled,
}: {
  onLocationSelect: (lat: number, lng: number) => void;
  disabled?: boolean;
}) {
  useMapEvents({
    click: (e) => {
      if (!disabled) {
        onLocationSelect(e.latlng.lat, e.latlng.lng);
      }
    },
  });
  return null;
}

export default function GuessMap({
  onLocationSelect,
  selectedLocation,
  correctLocation,
  showResult,
  disabled,
  expanded,
  className,
}: GuessMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`bg-[#16213e] rounded-lg flex items-center justify-center ${className ?? (expanded ? 'h-[60vh]' : 'h-[250px] lg:h-[300px]')}`}>
        <span className="text-[#f5f0e8]/40">Loading map...</span>
      </div>
    );
  }

  return (
    <div className={`relative rounded-lg overflow-hidden border border-[#2a2a4e] ${className ?? (expanded ? 'h-[60vh]' : 'h-[250px] lg:h-[300px]')}`}>
      <MapContainer
        center={[30, 10]}
        zoom={2}
        className="w-full h-full"
        style={{ background: '#0f0f1a' }}
        zoomControl={true}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        />
        <MapClickHandler onLocationSelect={onLocationSelect} disabled={disabled} />

        {selectedLocation && (
          <Marker
            position={[selectedLocation.lat, selectedLocation.lng]}
            icon={defaultIcon}
            draggable={!disabled}
            eventHandlers={{
              dragend: (e) => {
                if (!disabled) {
                  const marker = e.target;
                  const pos = marker.getLatLng();
                  onLocationSelect(pos.lat, pos.lng);
                }
              },
            }}
          >
            <Popup>Your guess</Popup>
          </Marker>
        )}

        {showResult && correctLocation && (
          <>
            <Marker
              position={[correctLocation.lat, correctLocation.lng]}
              icon={correctIcon}
            >
              <Popup>{correctLocation.name}</Popup>
            </Marker>
            {selectedLocation && (
              <Polyline
                positions={[
                  [selectedLocation.lat, selectedLocation.lng],
                  [correctLocation.lat, correctLocation.lng],
                ]}
                color="#c9a84c"
                weight={2}
                dashArray="8 4"
                opacity={0.7}
              />
            )}
          </>
        )}
      </MapContainer>

      {/* Map style overrides */}
      <style jsx global>{`
        .correct-marker {
          filter: hue-rotate(120deg) saturate(1.5);
        }
        .leaflet-container {
          font-family: inherit;
        }
      `}</style>
    </div>
  );
}
