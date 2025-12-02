import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-grow flex items-center px-6 md:px-16 py-12">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* KIRI — JUDUL & MENU */}
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Usaha <span className="text-yellow-400">Gxyer88</span>
          </h1>

          <p className="text-lg mt-4 mb-10 text-gray-300 max-w-md">
            Menjual Barang Bekas Berkualitas dengan Harga Terjangkau
          </p>

          {/* MENU ICON */}
          <div className="flex space-x-8">
            {/* MARKETPLACE */}
            <Link href="/produk" className="group text-center">
              <div className="bg-white/10 p-5 rounded-xl transition-all
                              group-hover:bg-white/20 group-hover:scale-105">
                <Image
                  src="/assets/maps.jpg"
                  alt="Marketplace"
                  width={60}
                  height={65}
                  className="rounded-md"
                />
              </div>
              <p className="font-semibold text-white mt-2">Marketplace</p>
            </Link>

            {/* ABOUT */}
            <Link href="/tentang" className="group text-center">
              <div className="bg-white/10 p-5 rounded-xl transition-all
                              group-hover:bg-white/20 group-hover:scale-105">
                <Image
                  src="/assets/statistik.png"
                  alt="About"
                  width={60}
                  height={60}
                />
              </div>
              <p className="font-semibold text-white mt-2">About</p>
            </Link>

            {/* KELUHAN */}
            <Link href="/kontak" className="group text-center">
              <div className="bg-white/10 p-5 rounded-xl transition-all
                              group-hover:bg-white/20 group-hover:scale-105">
                <Image
                  src="/assets/perencanaan.png"
                  alt="Keluhan"
                  width={60}
                  height={60}
                />
              </div>
              <p className="font-semibold text-white mt-2">Keluhan</p>
            </Link>
          </div>
        </div>

        {/* KANAN — ILUSTRASI */}
        <div className="hidden md:flex justify-center">
          <Image
            src="/assets/kota-serang.png"
            alt="Data Illustration"
            width={500}
            height={500}
            className="w-full h-auto drop-shadow-xl animate-fadeIn"
          />
        </div>

      </div>
    </main>
  );
}
