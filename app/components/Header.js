"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-black text-white py-2 px-8 md:px-16 flex justify-between items-center relative">

      {/* LOGO + BRAND */}
      <Link
        href="/"
        className="flex items-center gap-3 hover:opacity-80 transition-all duration-200"
      >
        <Image
          src="/assets/kota-serang.png"
          alt="Logo Pemerintah Kota Serang"
          width={85}
          height={85}
          className="object-contain"
        />

        <div className="leading-tight">
          <p className="text-sm font-semibold">Usaha</p>
          <p className="text-xl font-bold">Gxyer88</p>
        </div>
      </Link>

      {/* DESKTOP MENU */}
      <nav className="hidden md:flex items-center space-x-8">
        <Link href="/" className="hover:text-yellow-400 transition-colors">
          Beranda
        </Link>
        <Link href="/faq" className="hover:text-yellow-400 transition-colors">
          Faq
        </Link>
        <Link href="/kebijakan" className="hover:text-yellow-400 transition-colors">
          Kebijakan
        </Link>
        <Link href="/maintenance" className="hover:text-yellow-400 transition-colors">
          Doc API
        </Link>

        {/* LOGIN BUTTON (VALID & TANPA HYDRATION ERROR) */}
        <Link
          href="/login"
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-md transition-colors"
        >
          Login
        </Link>
      </nav>

      {/* MOBILE MENU BUTTON */}
      <div className="md:hidden relative">
        <button
          className="text-white text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>

        {/* MOBILE MENU */}
        <div
          className={`
            absolute right-0 mt-3 w-56 
            bg-black/95 backdrop-blur-md 
            rounded-lg shadow-xl z-50
            overflow-hidden border border-white/10
            transition-all duration-300 ease-in-out
            ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="flex flex-col py-2">

            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 hover:bg-white/10 transition rounded-md"
            >
              Beranda
            </Link>

            <Link
              href="/faq"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 hover:bg-white/10 transition rounded-md"
            >
              Faq
            </Link>

            <Link
              href="/kebijakan"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 hover:bg-white/10 transition rounded-md"
            >
              Kebijakan
            </Link>

            <Link
              href="/maintenance"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 hover:bg-white/10 transition rounded-md"
            >
              Doc API
            </Link>

            {/* LOGIN MOBILE — SUDAH SIMETRIS & RAPI */}
            <div className="px-4 mt-2 mb-2">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-md w-full block text-center transition"
              >
                Login
              </Link>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
