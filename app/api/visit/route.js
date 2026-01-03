import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    const { data, error } = await supabase
      .from("visitor_stats")
      .select("monthly_count, total_count")
      .eq("year", year)
      .eq("month", month)
      .single();

    if (error) throw error;

    return Response.json({
      monthly: data.monthly_count,
      total: data.total_count
    });
  } catch (err) {
    console.error(err);
    return Response.json({ monthly: 0, total: 0 });
  }
}

export async function POST() {
  try {
    const { error } = await supabase.rpc("increment_visitor_monthly");
    if (error) throw error;

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false });
  }
}
