import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT NOW() as currentTime");
    return NextResponse.json({ success: true, dbTime: rows[0].currentTime });
  } catch (err) {
    console.error("DB Connection Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
