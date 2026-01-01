import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-grow flex items-center px-6 md:px-16 py-12">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* KIRI — JUDUL & MENU */}
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-black leading-tight">
            Usaha <span className="text-blue-400">Gxyer88</span>
          </h1>

          <p className="text-lg mt-4 mb-10 text-gray-800 max-w-md">
            Menjual Barang Bekas Berkualitas dengan Harga Terjangkau
          </p>

          {/* MENU ICON */}
          <div className="flex space-x-8">

            {/* MARKETPLACE */}
            <Link href="/produk" className="group text-center">
              <div
                className="
                  w-20 h-20 bg-black/10 rounded-xl 
                  flex items-center justify-center
                  transition-all
                  group-hover:bg-black/20 group-hover:scale-105
                "
              >
                <Image
                  src="/assets/marketplace.png"
                  alt="Marketplace"
                  width={50}
                  height={50}
                />
              </div>
              <p className="font-semibold text-black mt-2">Marketplace</p>
            </Link>

            {/* ABOUT */}
            <Link href="/tentang" className="group text-center">
              <div
                className="
                  w-20 h-20 bg-black/10 rounded-xl 
                  flex items-center justify-center
                  transition-all
                  group-hover:bg-black/20 group-hover:scale-105
                "
              >
                <Image
                  src="/assets/about.png"
                  alt="About"
                  width={50}
                  height={50}
                />
              </div>
              <p className="font-semibold text-black mt-2">About</p>
            </Link>

            {/* KELUHAN */}
            <Link href="/kontak" className="group text-center">
              <div
                className="
                  w-20 h-20 bg-black/10 rounded-xl 
                  flex items-center justify-center
                  transition-all
                  group-hover:bg-black/20 group-hover:scale-105
                "
              >
                <Image
                  src="/assets/perencanaan.png"
                  alt="Keluhan"
                  width={50}
                  height={50}
                />
              </div>
              <p className="font-semibold text-black mt-2">Keluhan</p>
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
