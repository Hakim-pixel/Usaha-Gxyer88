"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function ProductsCRUD() {
  const [products, setProducts] = useState([]);

  async function loadProducts() {
    const { data } = await supabase.from("products").select("*");
    setProducts(data || []);
  }

  async function deleteProduct(id) {
    const confirmation = confirm("Hapus produk ini?");
    if (!confirmation) return;

    await supabase.from("products").delete().eq("id", id);

    loadProducts();
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6">Kelola Produk</h1>

        <div className="space-y-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="border p-4 rounded flex items-center justify-between"
            >
              <div>
                <h2 className="font-semibold">{p.title}</h2>
                <p className="text-indigo-600 font-bold">
                  Rp {p.price.toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => deleteProduct(p.id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          ))}

          {products.length === 0 && (
            <p className="text-center text-gray-500">Belum ada produk.</p>
          )}
        </div>
      </div>
    </main>
  );
}
