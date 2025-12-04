import { supabase } from "@/lib/supabase";

export async function logActivity({ user_email, action, model_type, model_id }) {
  const { error } = await supabase.from("activity_logs").insert([
    {
      user_email,
      action,
      model_type,
      model_id,
    },
  ]);

  if (error) {
    console.error("Gagal mencatat log:", error);
  }
}
