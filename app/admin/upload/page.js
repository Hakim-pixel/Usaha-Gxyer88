"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function UploadProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  async function handleUpload(e) {
    e.preventDefault();

    if (!image) return alert("Pilih gambar dulu!");

    // Upload file ke Supabase Storage
    const fileName = `${Date.now()}-${image.name}`;
    const { data: imgData, error: imgError } = await supabase.storage
      .from("product-images")
      .upload(fileName, image);

    if (imgError) {
      console.log(imgError);
      return alert("Upload gambar gagal.");
    }

    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/${fileName}`;

    // Simpan produk ke database
    const { error } = await supabase.from("products").insert({
      title,
      price,
      description,
      image_url: imageUrl
    });

    if (error) {
      console.error(error);
      alert("Gagal menyimpan produk.");
    } else {
      alert("Produk berhasil ditambahkan!");
      setTitle("");
      setPrice("");
      setDescription("");
      setImage(null);
    }
  }

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-semibold mb-6">Upload Produk</h1>

        <form className="space-y-4" onSubmit={handleUpload}>
          <input
            className="w-full p-3 border rounded"
            placeholder="Nama Produk"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />

          <input
            className="w-full p-3 border rounded"
            placeholder="Harga"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
          />

          <textarea
            className="w-full p-3 border rounded"
            placeholder="Deskripsi"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <input
            type="file"
            className="w-full"
            onChange={e => setImage(e.target.files[0])}
            required
          />

          <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
            Upload Produk
          </button>
        </form>
      </div>
    </main>
  );
}
