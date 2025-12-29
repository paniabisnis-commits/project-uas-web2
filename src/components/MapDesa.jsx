import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const desaIcon = new L.Icon({
  iconUrl: "/images/logo-desa.png",
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48],
});

export default function MapDesa() {
  const posisiDesa = [-8.020125, 112.055177];

  return (
    <MapContainer
      center={posisiDesa}
      zoom={15}
      scrollWheelZoom={false}
      style={{ height: "420px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={posisiDesa} icon={desaIcon}>
        <Popup>
          <strong>Kantor Desa Sumbersari</strong>
          <br />
          Kecamatan Sumbersuko, Kabupaten Sumberan
        </Popup>
      </Marker>
    </MapContainer>
  );
}
