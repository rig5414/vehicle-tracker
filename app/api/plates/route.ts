import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "API endpoint working" });
}

export async function POST() {
  return NextResponse.json({ message: "Post endpoint working" });
}
