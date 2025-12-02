"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    // 1. Login via Supabase Auth
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Email atau password salah!");
      console.error("Auth error:", authError);
      return;
    }

    const userEmail = data.user?.email;
    if (!userEmail) {
      setError("Gagal mengambil data user.");
      return;
    }

    // 2. Cek role dari tabel users (fix: ILIKE)
    const { data: rows, error: rowErr } = await supabase
      .from("users")
      .select("role")
      .ilike("email", userEmail)  
      .single();

    if (rowErr || !rows) {
      setError("Akun tidak punya role atau belum terdaftar di tabel users.");
      console.error("User row error:", rowErr);
      return;
    }

    if (rows.role !== "admin") {
      setError("Anda tidak memiliki akses admin.");
      return;
    }

    // 3. Sukses — redirect
    router.push("/admin");
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow max-w-md w-full">
        <h1 className="text-2xl font-semibold text-center mb-4">Login Admin</h1>

        {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <button className="w-full bg-indigo-600 text-white py-2 rounded">
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
