import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

// 1. Create/Upload Resource (POST)
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized administrative access." }, { status: 401 });
    }

    const data = await req.json();
    const { title, category, type, description, content } = data;

    if (!title || !category || !type || !description || !content) {
      return NextResponse.json({ success: false, error: "Missing required resource parameters." }, { status: 400 });
    }

    // Format clean filename and size estimation
    const cleanedFilename = title.toLowerCase().replace(/[^a-z0-9]+/g, "_") + ".txt";
    const byteSize = Buffer.byteLength(content, "utf8");
    const formattedSize = byteSize > 1024 
      ? `${(byteSize / 1024).toFixed(1)} KB` 
      : `${byteSize} Bytes`;

    const resource = await prisma.resource.create({
      data: {
        title,
        category,
        type,
        size: formattedSize,
        filename: cleanedFilename,
        description,
        content
      }
    });

    return NextResponse.json({ success: true, resource });
  } catch (error) {
    console.error("Create resource error", error);
    return NextResponse.json({ success: false, error: "Resource creation failure." }, { status: 500 });
  }
}

// 2. Delete Resource (DELETE)
export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized administrative access." }, { status: 401 });
    }

    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing Resource ID parameter." }, { status: 400 });
    }

    await prisma.resource.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete resource error", error);
    return NextResponse.json({ success: false, error: "Resource deletion failure." }, { status: 500 });
  }
}
