"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ActivityLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadLogs() {
    const { data, error } = await supabase
      .from("activity_logs")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setLogs(data);
    setLoading(false);
  }

  useEffect(() => {
    loadLogs();
  }, []);

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6">Activity Logs</h1>

        {loading && <p className="text-gray-500">Loading logs...</p>}

        {!loading && logs.length === 0 && (
          <p className="text-gray-500">Belum ada aktivitas tercatat.</p>
        )}

        <div className="space-y-4">
          {logs.map((log) => (
            <div
              key={log.id}
              className="p-4 border rounded-lg bg-gray-50 shadow-sm"
            >
              <p><strong>Email:</strong> {log.user_email}</p>
              <p><strong>Aksi:</strong> {log.action}</p>
              <p><strong>Model:</strong> {log.model_type}</p>
              <p><strong>ID Data:</strong> {log.model_id}</p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(log.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
