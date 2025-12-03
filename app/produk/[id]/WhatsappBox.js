"use client";

export default function WhatsappBox({ product }) {
  const adminPhone = "6289516409902"; // ganti nomor admin kamu

  const sendMessage = () => {
    const pesan = document.getElementById("pesan").value || 
      `Halo kak, apakah produk ${product.title} masih tersedia?`;

    const waURL = `https://wa.me/${adminPhone}?text=${encodeURIComponent(pesan)}`;
    window.open(waURL, "_blank");
  };

  return (
    <div className="mt-6">
      <label className="block font-medium mb-2 text-gray-800">
        Pesan sebelum menghubungi:
      </label>

      <textarea
        id="pesan"
        placeholder="Halo kak, apakah produk ini masih tersedia?"
        className="w-full rounded-lg border border-gray-300 p-3 h-28 focus:ring focus:ring-blue-300"
      ></textarea>

      <button
        onClick={sendMessage}
        className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-medium text-center shadow-md w-full"
      >
        Kirim Pesan ke WhatsApp
      </button>
    </div>
  );
}
