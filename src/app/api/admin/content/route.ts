import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized administrative access." }, { status: 401 });
    }

    const data = await req.json();
    const { action } = data;

    // 1. Action: Edit Site text blocks
    if (action === "site_content") {
      const { key, value } = data;
      if (!key) return NextResponse.json({ success: false, error: "Missing CMS key." }, { status: 400 });
      
      const content = await prisma.content.upsert({
        where: { key },
        update: { value },
        create: { key, value }
      });
      return NextResponse.json({ success: true, content });
    }

    // 2. Action: Edit Programs specifications
    if (action === "program") {
      const { id, title, subtitle, description, objectives, benefits, futureGoals } = data;
      if (!id) return NextResponse.json({ success: false, error: "Missing Program ID." }, { status: 400 });

      const program = await prisma.program.update({
        where: { id },
        data: {
          title,
          subtitle,
          description,
          objectives, // Stored as newline-separated values
          benefits,   // Stored as newline-separated values
          futureGoals
        }
      });
      return NextResponse.json({ success: true, program });
    }

    // 3. Action: Edit or Create FAQs
    if (action === "faq_upsert") {
      const { id, question, answer, category } = data;
      if (!question || !answer || !category) {
        return NextResponse.json({ success: false, error: "Missing question, answer, or category." }, { status: 400 });
      }

      if (id) {
        const faq = await prisma.faq.update({
          where: { id },
          data: { question, answer, category }
        });
        return NextResponse.json({ success: true, faq });
      } else {
        const faq = await prisma.faq.create({
          data: { question, answer, category }
        });
        return NextResponse.json({ success: true, faq });
      }
    }

    // 4. Action: Delete FAQs
    if (action === "faq_delete") {
      const { id } = data;
      if (!id) return NextResponse.json({ success: false, error: "Missing FAQ ID." }, { status: 400 });

      await prisma.faq.delete({ where: { id } });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: "Invalid content action." }, { status: 400 });
  } catch (error) {
    console.error("Content CMS error", error);
    return NextResponse.json({ success: false, error: "Content update failure." }, { status: 500 });
  }
}
