import { supabase } from "@/lib/supabase";
import Image from "next/image";
import WhatsappBox from "./WhatsappBox";

export default async function ProductDetail({ params }) {
  const { id } = params;

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !product) {
    return (
      <div className="text-center text-red-600 mt-20 text-xl">
        Produk tidak ditemukan.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* CARD UTAMA */}
        <div className="bg-white shadow-xl rounded-2xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* FOTO PRODUK — RESPONSIVE */}
          <div className="w-full">
            <div
              className="
                relative w-full 
                aspect-[4/3]       /* Mobile default */
                sm:aspect-[4/3]
                md:aspect-[4/3]
                lg:aspect-[3/2]    /* Desktop */
                xl:aspect-video    /* Layar besar */
                bg-gray-200 
                rounded-xl 
                overflow-hidden 
                shadow-md
              "
            >
              <Image
                src={product.image_url}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* PANEL INFORMASI */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Judul */}
              <h1 className="text-3xl font-bold mb-3">{product.title}</h1>

              {/* Harga */}
              <p className="text-green-600 text-4xl font-extrabold mb-2">
                Rp {product.price.toLocaleString()}
              </p>

              {/* Lokasi */}
              <p className="text-gray-600 mb-6">
                Listed in {product.location ?? "Serang, Banten"}
              </p>

              <hr className="my-6" />

              {/* Spesifikasi */}
              <h2 className="text-xl font-semibold mb-3">Spesifikasi</h2>
              <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* WhatsApp Box (Client component) */}
            <WhatsappBox product={product} />

          </div>
        </div>
      </div>
    </main>
  );
}
