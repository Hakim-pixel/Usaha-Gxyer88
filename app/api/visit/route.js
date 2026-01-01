import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    // Ambil data
    const { data, error } = await supabase
      .from("visitors")
      .select("total")
      .eq("id", 1)
      .single();

    if (error) throw error;

    return Response.json({ total: data.total });
  } catch (err) {
    console.error(err);
    return Response.json({ total: 0 });
  }
}

export async function POST() {
  try {
    // Increment counter
    const { error } = await supabase.rpc("increment_visitor");

    if (error) throw error;

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false });
  }
}
