"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const orangeIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23F97316'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z'/%3E%3Ccircle cx='12' cy='10' r='2.5' fill='white'/%3E%3C/svg%3E",
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

export default function Address() {
  return (
    <section className="bg-[#f7f4ef] py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="h-60 lg:h-90  overflow-hidden shadow-xl">
          <MapContainer
            center={[45.4642, 9.19]}
            zoom={15}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png" />

            <Marker position={[45.4642, 9.19]} icon={orangeIcon}>
              <Popup>
                <h3 className="text-primary-500 text-lg font-extrabold tracking-widest">
                  Vesper
                </h3>
                <br />
                Via Monte Napoleone 12
                <br />
                Milano, Italy
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        <div className="text-neutral-800 flex flex-col items-center lg:items-start">
          <h2 className="text-sm uppercase tracking-widest mb-4">Visit Us</h2>
          <h3 className="text-4xl mb-6">
            <span className="text-primary-500 font-bold">Vesper</span>{" "}
            <span className="italic">Milano</span>
          </h3>
          <p className="mb-8 text-lg leading-relaxed max-w-md text-center lg:text-left">
            An intimate luxury restaurant & bar located in the heart of Milan.
          </p>
          <div className="space-y-4 text-center lg:text-left">
            <p>
              <span className="font-medium">Address</span>
              <br />
              Via Monte Napoleone 12, 20121 Milano
            </p>
            <p>
              <span className="font-medium">Phone</span>
              <br />
              +39 02 9876 5432
            </p>
            <p>
              <span className="font-medium">Email</span>
              <br />
              info@vesper.it
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
