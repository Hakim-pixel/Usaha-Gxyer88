"use client";
import { useState } from "react";

export default function KontakPage() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [photoError, setPhotoError] = useState(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  }

  function handlePhotoChange(e) {
    const file = e.target.files && e.target.files[0];
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/jpg"];

    if (file) {
      if (!allowedTypes.includes(file.type)) {
        setPhoto(null);
        setPreview(null);
        setPhotoError("Tipe file tidak didukung. Gunakan JPG/PNG/WebP/GIF.");
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setPhoto(null);
        setPreview(null);
        setPhotoError("Ukuran file terlalu besar (maks 5MB).");
        return;
      }

      setPhoto(file);
      setPreview(URL.createObjectURL(file));
      setPhotoError(null);
    } else {
      setPhoto(null);
      setPreview(null);
      setPhotoError(null);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // Use FormData to send optional file attachment
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("message", values.message);
    if (photo) formData.append("photo", photo);

    const res = await fetch("/api/send-email", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      setSent(true);
      setValues({ name: "", email: "", message: "" });

      setTimeout(() => setSent(false), 4000);
    } else {
      alert("Gagal mengirim pesan!");
      console.log("Error:", data);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 py-16 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* INFO KONTAK */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h1 className="text-2xl font-semibold mb-3">
            Kontak <span className="text-indigo-600">Kami</span>
          </h1>

          <p className="text-sm text-gray-600 mb-6">
            Butuh bantuan atau ada masukan? Isi formulir atau hubungi kami lewat info di bawah.
          </p>

          <div className="space-y-3 text-sm">
            <p><strong>Alamat:</strong> Kota Serang, Banten, Indonesia</p>
            <p><strong>WhatsApp:</strong> 0895-3288-54882</p>
            <p><strong>Email:</strong> usahagxyer88@gmail.com</p>
            <p><strong>Instagram:</strong> @hakimm.png</p>
            <p><strong>Jam Operasional:</strong> 09.00 – 21.00 WIB</p>
          </div>
        </div>

        {/* FORM KELUHAN */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-lg font-medium mb-4">Kirim Pesan</h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-xs font-medium text-gray-700">Nama</label>
              <input
                name="name"
                value={values.name}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="Nama lengkap"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700">Email</label>
              <input
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="email@domain.com"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700">Pesan</label>
              <textarea
                name="message"
                rows="5"
                value={values.message}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="Tulis pesan Anda..."
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700">Foto (opsional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="mt-1 w-full text-sm"
              />

              {preview && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500">Preview:</p>
                  <img src={preview} alt="preview" className="mt-1 max-h-40 rounded-md border" />
                </div>
              )}

              {photoError && (
                <p className="text-sm text-red-600 mt-2">{photoError}</p>
              )}
            </div>

            <button
              disabled={loading}
              className={`w-full py-2 rounded-lg font-medium text-white ${
                loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? "Mengirim..." : "Kirim Pesan"}
            </button>

            {sent && (
              <p className="text-sm text-green-600 mt-2">
                Pesan terkirim — terima kasih!
              </p>
            )}
          </form>
        </div>

      </div>
    </main>
  );
}
