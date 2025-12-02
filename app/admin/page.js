"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      // cek auth Supabase
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        // belum login
        router.replace("/login");
        return;
      }

      // cek role di tabel users
      const { data: rows } = await supabase
        .from("users")
        .select("role")
        .eq("email", user.email)
        .single();

      if (!rows || rows.role !== "admin") {
        router.replace("/login");
        return;
      }

      setLoading(false);
    }

    checkAuth();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard Admin</h1>

          {/* 🔥 Tombol Logout */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            Logout
          </button>
        </div>

        <div className="space-y-4">
          <Link
            href="/admin/upload"
            className="block p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            ➕ Upload Produk
          </Link>

          <Link
            href="/admin/products"
            className="block p-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            📦 Kelola Produk (CRUD)
          </Link>
        </div>
      </div>
    </main>
  );
}
