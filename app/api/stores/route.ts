import db from "@/lib/prisma-db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    const body = await req.json();
    const { name } = body;

    if (!name) return new NextResponse("Name is required", { status: 400 });

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const store = await db.store.create({ data: { name, userId } });
    return NextResponse.json(store);
  } catch (error) {
    // thorw error
    console.log("[STORE_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
