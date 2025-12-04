"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { logActivity } from "@/lib/logActivity";

export default function UploadProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [images, setImages] = useState([]); // MULTI IMAGE
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleImageSelect(e) {
    const files = Array.from(e.target.files);
    setImages(files);

    // preview
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreview(previews);
  }

  async function handleUpload(e) {
    e.preventDefault();
    if (images.length === 0) return alert("Pilih minimal 1 gambar!");

    setLoading(true);

    try {
      let uploadedUrls = [];

      // 🔥 Upload semua file satu per satu
      for (const img of images) {
        const fileName = `${Date.now()}-${img.name}`;

        const { error: uploadErr } = await supabase.storage
          .from("product-images")
          .upload(fileName, img);

        if (uploadErr) throw uploadErr;

        uploadedUrls.push(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/${fileName}`
        );
      }

      // 🔥 Simpan produk ke database
      const { data: newProduct, error } = await supabase
        .from("products")
        .insert({
          title,
          price,
          description,
          image_urls: uploadedUrls, // << MULTI IMAGE ARRAY
        })
        .select()
        .single();

      if (error) throw error;

      // 🔥 Log Activity
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        await logActivity({
          user_email: user.email,
          action: "CREATE",
          model_type: "product",
          model_id: newProduct.id,
        });
      }

      alert("Produk berhasil ditambahkan!");

      // Reset form
      setTitle("");
      setPrice("");
      setDescription("");
      setImages([]);
      setPreview([]);

    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan produk.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-6">Upload Produk</h1>

        <form className="space-y-4" onSubmit={handleUpload}>

          <input
            className="w-full p-3 border rounded"
            placeholder="Nama Produk"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            className="w-full p-3 border rounded"
            placeholder="Harga"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <textarea
            className="w-full p-3 border rounded"
            placeholder="Deskripsi"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* MULTI IMAGE INPUT */}
          <div>
            <label className="block mb-1 font-medium">Upload Gambar</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageSelect}
              className="w-full"
              required
            />
          </div>

          {/* PREVIEW GRID */}
          {preview.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mt-3">
              {preview.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  className="w-full h-24 object-cover rounded-lg border"
                />
              ))}
            </div>
          )}

          <button
            disabled={loading}
            className={`w-full p-3 rounded-lg text-white font-semibold mt-4 ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Mengupload..." : "Upload Produk"}
          </button>
        </form>
      </div>
    </main>
  );
}
