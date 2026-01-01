"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [visitorCount, setVisitorCount] = useState(null);

  async function fetchVisitors() {
    const res = await fetch("/api/visit");
    const data = await res.json();
    setVisitorCount(data.total);
  }

  async function addVisit() {
    await fetch("/api/visit", { method: "POST" });
  }

  useEffect(() => {
    addVisit();      // Hitung visitor baru
    fetchVisitors(); // Update tampilan
  }, []);

  return (
    <footer className="bg-[#000000] text-white px-6 py-8">
      <p className="text-center text-xs text-gray-300 mt-2">
        Copyright © 2025 Usaha Gxyer88 & Hakim-Pixel. All Rights Reserved.
      </p>

      <p className="text-center text-sm mb-2">
         Total Pengunjung Bulan ini:{" "}
        <span className="font-bold text-blue-400">
          {visitorCount !== null ? visitorCount : "Loading..."}
        </span>
      </p>
    </footer>
  );
}
