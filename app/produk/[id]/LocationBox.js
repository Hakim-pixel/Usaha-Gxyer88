"use client";

export default function LocationBox({ product }) {
  const sellerLoc = product.location || "Alun-Alun Kota Serang";

  // Koordinat Alun-Alun Kota Serang (default)
  const lat = product.lat || -6.118750;
  const lng = product.lng || 106.150558;

  // Konversi koordinat → tile XYZ untuk Wikimedia map
  const zoom = 16;
  const latRad = (lat * Math.PI) / 180;
  const n = Math.pow(2, zoom);

  const xTile = Math.floor(((lng + 180) / 360) * n);
  const yTile = Math.floor(
    (1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n
  );

  // STATIC MAP WIKIMEDIA (tanpa API key, dijamin muncul)
  const mapURL = `https://maps.wikimedia.org/osm-intl/${zoom}/${xTile}/${yTile}.png`;

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-3">Location</h2>

      {/* STATIC MAP */}
      <div className="w-full h-56 overflow-hidden rounded-xl shadow border">
        <img src={mapURL} alt="Map preview" className="w-full h-full object-cover" />
      </div>

      {/* NAME */}
      <div className="mt-3">
        <p className="text-lg font-semibold">{sellerLoc}</p>
        <p className="text-sm text-gray-500">Perkiraan lokasi</p>
      </div>

      {/* LINK GOOGLE MAPS */}
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
        target="_blank"
        className="mt-3 inline-block text-blue-600 hover:underline font-medium"
      >
        Lihat di Google Maps
      </a>
    </div>
  );
}
