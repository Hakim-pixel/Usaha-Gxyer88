"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";

export default function MarketplacePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // FILTER STATES
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  async function loadProducts(applyFilters = false) {
    setLoading(true);

    let query = supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    // Filter harga minimum
    if (applyFilters && minPrice !== "") {
      query = query.gte("price", Number(minPrice));
    }

    // Filter harga maksimum
    if (applyFilters && maxPrice !== "") {
      query = query.lte("price", Number(maxPrice));
    }

    const { data, error } = await query;

    if (error) {
      console.error(error);
      setProducts([]);
      setLoading(false);
      return;
    }

    setProducts(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <main className="min-h-screen bg-white">

      {/* HEADER */}
      <div className="p-4 border-b shadow-sm bg-white sticky top-0 z-20">
        <h1 className="text-3xl font-extrabold text-gray-900">Marketplace</h1>

        <div className="flex space-x-4 mt-4 overflow-x-auto no-scrollbar">
          <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold">
            Untuk Anda
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full">
            Jual
          </button>
        </div>
      </div>

      {/* FILTER */}
      <div className="p-4 border-b bg-white">
        <h2 className="font-semibold mb-3 text-gray-800">Filter</h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

          <input
            type="number"
            placeholder="Harga Minimum"
            className="border p-2 rounded"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />

          <input
            type="number"
            placeholder="Harga Maksimum"
            className="border p-2 rounded"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />

          <button
            onClick={() => loadProducts(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded p-2 font-semibold"
          >
            Terapkan Filter
          </button>

          <button
            onClick={() => {
              setMinPrice("");
              setMaxPrice("");
              loadProducts(false);
            }}
            className="bg-gray-300 hover:bg-gray-400 text-black rounded p-2 font-semibold"
          >
            Reset / Refresh
          </button>
        </div>
      </div>

      {/* GRID PRODUK */}
      <div className="p-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">

        {/* LIST PRODUK */}
        {!loading &&
          products.map((p) => {
            const imageList = Array.isArray(p.image_urls) ? p.image_urls : [];
            const mainImage = imageList.length > 0 ? imageList[0] : "/no-image.png";

            return (
              <Link
                key={p.id}
                href={`/produk/${p.id}`}
                className="border bg-white hover:bg-gray-50 transition rounded-md overflow-hidden"
              >
                {/* GAMBAR */}
                <div className="relative w-full h-40 sm:h-44 bg-gray-200">
                  <Image
                    src={mainImage}
                    alt={p.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* DETAIL */}
                <div className="px-2 py-3">
                  <p className="font-bold text-lg text-black">
                    Rp {Number(p.price).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-800 font-medium line-clamp-1">
                    {p.title}
                  </p>
                </div>
              </Link>
            );
          })}

        {/* LOADING SKELETON */}
        {loading &&
          [...Array(8)].map((_, i) => (
            <div key={i} className="border rounded bg-gray-100 animate-pulse">
              <div className="w-full h-40 bg-gray-300"></div>
              <div className="p-3">
                <div className="h-4 bg-gray-300 mb-2 w-24"></div>
                <div className="h-4 bg-gray-200 w-32"></div>
              </div>
            </div>
          ))}

        {/* TIDAK ADA PRODUK */}
        {!loading && products.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            Tidak ada produk ditemukan.
          </p>
        )}
      </div>
    </main>
  );
}
