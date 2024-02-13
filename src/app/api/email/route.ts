import { sendMail } from "@/service/server/mail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    await sendMail(data);
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
