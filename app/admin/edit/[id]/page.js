"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [images, setImages] = useState([]);      
  const [newImages, setNewImages] = useState([]); 

  // -----------------------------------------------------------
  // LOAD EXISTING DATA
  // -----------------------------------------------------------
  useEffect(() => {
    async function loadProduct() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        alert("Produk tidak ditemukan.");
        router.replace("/admin/products");
        return;
      }

      setTitle(data.title);
      setPrice(data.price);
      setDescription(data.description || "");
      setImages(data.image_urls || []);

      setLoading(false);
    }

    if (id) loadProduct();
  }, [id, router]);

  // -----------------------------------------------------------
  // REMOVE EXISTING IMAGE
  // -----------------------------------------------------------
  function removeExistingImage(url) {
    setImages((prev) => prev.filter((img) => img !== url));
  }

  // -----------------------------------------------------------
  // SAVE PRODUCT UPDATE
  // -----------------------------------------------------------
  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);

    let updatedImages = [...images];

    // Upload gambar baru
    if (newImages.length > 0) {
      for (let file of newImages) {
        const fileName = `${Date.now()}-${file.name}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, file);

        if (uploadError) {
          console.log(uploadError);
          alert("Gagal upload gambar!");
          setSaving(false);
          return;
        }

        const publicUrl =
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/${fileName}`;

        updatedImages.push(publicUrl);
      }
    }

    // UPDATE PRODUK (tanpa lokasi)
    const { error: updateError } = await supabase
      .from("products")
      .update({
        title,
        price: Number(price),
        description,
        image_urls: updatedImages,
      })
      .eq("id", id);

    setSaving(false);

    if (updateError) {
      console.error("UPDATE ERROR:", updateError);
      alert("Gagal update produk! " + updateError.message);
      return;
    }

    alert("Produk berhasil diperbarui!");
    router.push("/admin/products");
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold mb-6">Edit Produk</h1>

        <form className="space-y-5" onSubmit={handleSave}>

          {/* TITLE */}
          <input
            type="text"
            className="w-full p-3 border rounded"
            placeholder="Nama Produk"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* PRICE */}
          <input
            type="number"
            className="w-full p-3 border rounded"
            placeholder="Harga"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          {/* DESCRIPTION */}
          <textarea
            className="w-full p-3 border rounded h-32"
            placeholder="Deskripsi"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          {/* EXISTING IMAGES */}
          <div>
            <p className="font-semibold mb-2">Foto Produk</p>

            {images.length === 0 && (
              <p className="text-gray-500">Tidak ada gambar.</p>
            )}

            <div className="grid grid-cols-3 gap-3">
              {images.map((url, idx) => (
                <div key={idx} className="relative w-full h-24">
                  <Image
                    src={url}
                    alt="produk"
                    fill
                    className="object-cover rounded"
                  />

                  <button
                    type="button"
                    onClick={() => removeExistingImage(url)}
                    className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ADD NEW IMAGES */}
          <div>
            <p className="font-semibold mb-2">Tambah Foto Baru</p>

            <input
              type="file"
              multiple
              className="w-full border p-2 rounded"
              onChange={(e) => setNewImages([...e.target.files])}
            />
          </div>

          {/* SAVE */}
          <button
            disabled={saving}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
          >
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>

        </form>
      </div>
    </main>
  );
}
