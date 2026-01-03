"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [monthly, setMonthly] = useState(null);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    fetch("/api/visit", { method: "POST" })
      .then(() => fetch("/api/visit"))
      .then(res => res.json())
      .then(data => {
        setMonthly(data.monthly);
        setTotal(data.total);
      });
  }, []);

  return (
    <footer className="bg-black text-white px-6 py-8">
      <p className="text-center text-xs text-gray-300">
        © 2025 Usaha Gxyer88 & Hakim-Pixel
      </p>

      <p className="text-center text-sm mt-2">
        Pengunjung Bulan Ini:{" "}
        <span className="text-blue-400 font-bold">
          {monthly ?? "Loading..."}
        </span>
      </p>

      <p className="text-center text-sm">
        Total Pengunjung:{" "}
        <span className="text-blue-400 font-bold">
          {total ?? "Loading..."}
        </span>
      </p>
    </footer>
  );
}
