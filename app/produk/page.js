"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";

export default function MarketplacePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setProducts(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Produk Terbaru</h1>

      {/* LOADING STATE */}
      {loading && (
        <p className="text-center text-gray-500">Memuat produk...</p>
      )}

      {/* GRID PRODUK */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {!loading &&
          products.map((p) => (
            <Link
              key={p.id}
              href={`/produk/${p.id}`}
              className="bg-white shadow hover:shadow-lg transition rounded-xl overflow-hidden border border-gray-200"
            >
              <div className="relative w-full h-48 bg-gray-200">
                <Image
                  src={p.image_url}
                  alt={p.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <h2 className="font-semibold text-gray-800 line-clamp-1">
                  {p.title}
                </h2>

                <p className="text-green-600 font-bold text-lg mt-1">
                  Rp {p.price.toLocaleString()}
                </p>

                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {p.description}
                </p>
              </div>
            </Link>
          ))}

        {/* TIDAK ADA PRODUK */}
        {!loading && products.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            Belum ada produk tersedia.
          </p>
        )}
      </div>
    </main>
  );
}
