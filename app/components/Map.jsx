"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const orangeIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23F97316'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z'/%3E%3Ccircle cx='12' cy='10' r='2.5' fill='white'/%3E%3C/svg%3E",
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

export default function Map() {
  return (
    <div className="min-h-75 lg:h-112.5 w-full overflow-hidden shadow-xl">
      <MapContainer
        center={[45.4642, 9.19]}
        zoom={15}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          url={`https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png?api_key=${process.env.NEXT_PUBLIC_STADIA_API_KEY}`}
        />

        <Marker position={[45.4642, 9.19]} icon={orangeIcon}>
          <Popup>
            <strong className="text-lg text-primary-500">Vesper</strong>
            <br />
            Via Monte Napoleone 12
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
