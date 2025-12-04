"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductsCRUD() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    setLoading(true);

    const { data } = await supabase.from("products").select("*");

    setProducts(data || []);
    setLoading(false);
  }

  async function deleteProduct(id) {
    const confirmation = confirm("Yakin ingin menghapus produk ini?");
    if (!confirmation) return;

    await supabase.from("products").delete().eq("id", id);
    loadProducts();
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Kelola Produk</h1>
          <Link
            href="/admin/upload"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
          >
            + Tambah Produk
          </Link>
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-center text-gray-500 animate-pulse text-lg">
            Memuat produk...
          </p>
        )}

        {/* EMPTY STATE */}
        {!loading && products.length === 0 && (
          <p className="text-center text-gray-500 py-10 text-lg">
            Belum ada produk.
          </p>
        )}

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-white"
            >
              {/* FOTO PRODUK */}
              <div className="relative w-full h-44 bg-gray-200">
                <Image
                  src={p.image_urls?.[0] || p.image_url || "/no-image.png"}
                  alt={p.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* DETAIL */}
              <div className="p-4">
                <h2 className="font-semibold text-lg line-clamp-1">
                  {p.title}
                </h2>

                <p className="text-indigo-600 font-bold text-xl mt-1">
                  Rp {Number(p.price).toLocaleString()}
                </p>

                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {p.description || "Tidak ada deskripsi."}
                </p>

                {/* BUTTON GROUP */}
                <div className="mt-4 flex gap-2">
                  {/* BUTTON EDIT */}
                  <Link
                    href={`/admin/edit/${p.id}`}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg text-center"
                  >
                    Edit
                  </Link>

                  {/* BUTTON DELETE */}
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
