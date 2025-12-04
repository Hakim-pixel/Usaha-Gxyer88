"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

// ICONS
import { FaStore, FaPlus, FaBoxOpen, FaHistory } from "react-icons/fa";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // STATE STATISTIK
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [totalLogs, setTotalLogs] = useState(0);

  // ----------------------------
  // CEK LOGIN + ROLE ADMIN
  // ----------------------------
  useEffect(() => {
    async function checkAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

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
      loadStats(); // Load statistik awal
    }

    checkAuth();
  }, [router]);

  // ----------------------------
  // LOAD DATA STATISTIK
  // ----------------------------
  async function loadStats() {
    // Hitung total produk
    const { count: productCount } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });

    setTotalProducts(productCount || 0);

    // Hitung total admin
    const { count: adminCount } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .eq("role", "admin");

    setTotalAdmins(adminCount || 0);

    // Hitung total logs
    const { count: logCount } = await supabase
      .from("activity_logs")
      .select("*", { count: "exact", head: true });

    setTotalLogs(logCount || 0);
  }

  // ----------------------------
  // REALTIME LISTENER
  // ----------------------------
  useEffect(() => {
    const productSub = supabase
      .channel("products-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        () => loadStats()
      )
      .subscribe();

    const logSub = supabase
      .channel("logs-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "activity_logs" },
        () => loadStats()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(productSub);
      supabase.removeChannel(logSub);
    };
  }, []);

  // ----------------------------
  // LOGOUT
  // ----------------------------
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

  // ----------------------------
  // UI
  // ----------------------------
  return (
    <main className="min-h-screen bg-gray-100 flex relative">

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:block w-64 bg-black text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold">Admin Panel</h2>

        <nav className="space-y-3">
          <Link href="/admin" className="flex items-center gap-2 hover:text-blue-400">
            <FaStore /> Dashboard
          </Link>

          <Link href="/admin/upload" className="flex items-center gap-2 hover:text-blue-400">
            <FaPlus /> Upload Produk
          </Link>

          <Link href="/admin/products" className="flex items-center gap-2 hover:text-blue-400">
            <FaBoxOpen /> Kelola Produk
          </Link>

          <Link href="/admin/logs" className="flex items-center gap-2 hover:text-blue-400">
            <FaHistory /> Activity Logs
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 hover:bg-red-700 w-full py-2 rounded-lg"
        >
          Logout
        </button>
      </aside>

      {/* MOBILE MENU BUTTON */}
      <div className="md:hidden fixed top-5 left-5 z-50">
        <button
          onClick={() => setMenuOpen(true)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg shadow-md active:scale-95 transition"
        >
          ☰ <span className="text-sm font-medium">Menu</span>
        </button>
      </div>

      {/* BACKDROP */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 
        transform transition-transform duration-300 
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b bg-white">
          <p className="text-xl font-bold text-black">Admin Panel</p>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-xl text-black active:scale-90"
          >
            ✖
          </button>
        </div>

        <nav className="flex flex-col text-base mt-2 text-black">
          <Link href="/admin" className="px-6 py-4 flex items-center gap-3 border-b hover:bg-gray-100">
            <FaStore /> Dashboard
          </Link>

          <Link href="/admin/upload" className="px-6 py-4 flex items-center gap-3 border-b hover:bg-gray-100">
            <FaPlus /> Upload Produk
          </Link>

          <Link href="/admin/products" className="px-6 py-4 flex items-center gap-3 border-b hover:bg-gray-100">
            <FaBoxOpen /> Kelola Produk
          </Link>

          <Link href="/admin/logs" className="px-6 py-4 flex items-center gap-3 border-b hover:bg-gray-100">
            <FaHistory /> Activity Logs
          </Link>
        </nav>

        <div className="p-5">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
          >
            Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className="flex-1 p-6 md:p-10">
        <h1 className="text-3xl font-bold mb-6">
          Selamat datang, <span className="text-indigo-600">Admin!</span>
        </h1>

        {/* KARTU STATISTIK */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          <div className="p-6 bg-white rounded-xl shadow text-center">
            <p className="text-gray-700 text-sm">Total Produk</p>
            <h2 className="text-3xl font-bold text-indigo-600">{totalProducts}</h2>
          </div>

          <div className="p-6 bg-white rounded-xl shadow text-center">
            <p className="text-gray-700 text-sm">Total Admin</p>
            <h2 className="text-3xl font-bold text-green-600">{totalAdmins}</h2>
          </div>

          <div className="p-6 bg-white rounded-xl shadow text-center">
            <p className="text-gray-700 text-sm">Activity Logs</p>
            <h2 className="text-3xl font-bold text-orange-500">{totalLogs}</h2>
          </div>

        </div>
      </section>
    </main>
  );
}
