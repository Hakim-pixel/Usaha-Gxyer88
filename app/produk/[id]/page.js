"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { useParams } from "next/navigation";
import WhatsappBox from "./WhatsappBox";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("/no-image.png");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);
  const zoomRef = useRef(null);
  const [zoom, setZoom] = useState(1);

  // ─── LOAD PRODUK ───────────────────────────────────────────
  useEffect(() => {
    async function loadProduct() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        setProduct(data);

        const images = Array.isArray(data.image_urls) ? data.image_urls : [];
        setMainImage(images.length > 0 ? images[0] : "/no-image.png");
      }

      setLoading(false);
    }

    loadProduct();
  }, [id]);

  if (loading) return loadingUI();
  if (!product) return notFoundUI();

  const imageList = Array.isArray(product.image_urls) ? product.image_urls : [];
  const price = Number(product.price).toLocaleString();
  const locationText = product.location || "Serang, Banten";

  // ─── GANTI FOTO DENGAN ANIMASI ─────────────────────────────
  function changeImage(index) {
    if (index < 0 || index >= imageList.length) return;

    setFade(true);
    setTimeout(() => {
      setMainImage(imageList[index]);
      setCurrentIndex(index);
      setFade(false);
    }, 200);
  }

  // ─── NEXT / PREV BUTTONS ───────────────────────────────────
  function nextImage() {
    changeImage((currentIndex + 1) % imageList.length);
  }

  function prevImage() {
    changeImage((currentIndex - 1 + imageList.length) % imageList.length);
  }

  // ─── ZOOM HANDLER ──────────────────────────────────────────
  function handleWheel(e) {
    e.preventDefault();
    let newZoom = zoom + (e.deltaY > 0 ? -0.1 : 0.1);
    newZoom = Math.min(Math.max(newZoom, 1), 3); // batas zoom
    setZoom(newZoom);
  }

  function doubleClickZoom() {
    setZoom((z) => (z === 1 ? 2 : 1));
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* CARD UTAMA */}
        <div className="bg-white shadow-xl rounded-2xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* FOTO UTAMA */}
          <div className="w-full">
            <div
              onClick={() => setLightboxOpen(true)}
              className={`
                relative w-full cursor-pointer overflow-hidden
                rounded-xl shadow-md bg-gray-200
                aspect-[4/3] lg:aspect-[3/2] xl:aspect-video
                ${fade ? "opacity-60" : "opacity-100"} transition
              `}
            >
              <Image
                src={mainImage}
                alt="Main"
                fill
                priority
                className="object-cover transition-opacity duration-300"
              />
            </div>

            {/* THUMBNAIL */}
            {imageList.length > 1 && (
              <div className="grid grid-cols-4 gap-3 mt-4">
                {imageList.map((url, idx) => (
                  <button
                    key={idx}
                    onClick={() => changeImage(idx)}
                    className={`
                      relative w-full h-20 overflow-hidden rounded-lg border
                      ${currentIndex === idx ? "border-blue-500" : "border-gray-300"}
                      hover:opacity-80 transition
                    `}
                  >
                    <Image src={url} fill alt="thumb" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* PANEL INFO */}
          <div className="flex flex-col justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-3">{product.title}</h1>
              <p className="text-green-600 text-4xl font-extrabold mb-2">
                Rp {price}
              </p>
              <p className="text-gray-600 mb-6">
                Listed in {locationText}
              </p>

              <hr className="my-6" />

              <h2 className="text-xl font-semibold mb-3">Spesifikasi</h2>
              <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                {product.description || "Tidak ada deskripsi."}
              </p>
            </div>

            <WhatsappBox product={product} />
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────── */}
      {/* LIGHTBOX FULLSCREEN */}
      {/* ───────────────────────────────────────────── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[999]"
        >
          {/* CLOSE */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white text-4xl font-bold"
          >
            ✖
          </button>

          {/* PREV BUTTON */}
          {imageList.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-6 text-white text-5xl font-bold"
            >
              ‹
            </button>
          )}

          {/* IMAGE */}
          <div
            ref={zoomRef}
            onWheel={handleWheel}
            onDoubleClick={doubleClickZoom}
            className="relative w-full max-w-4xl h-[80vh] cursor-zoom-in"
          >
            <Image
              src={mainImage}
              alt="zoom"
              fill
              className="object-contain transition-transform"
              style={{ transform: `scale(${zoom})` }}
            />
          </div>

          {/* NEXT BUTTON */}
          {imageList.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-6 text-white text-5xl font-bold"
            >
              ›
            </button>
          )}
        </div>
      )}
    </main>
  );
}

/* ─── UI COMPONENTS ─────────────────────────── */
function loadingUI() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600 text-xl">Loading...</p>
    </main>
  );
}

function notFoundUI() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="text-red-600 text-xl font-semibold">
        Produk tidak ditemukan.
      </p>
    </main>
  );
}
