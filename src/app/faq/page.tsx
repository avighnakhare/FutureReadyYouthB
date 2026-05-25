import { prisma } from "@/lib/db";
import { initializeDatabase } from "@/lib/init";
import FaqClient from "./FaqClient";

export const dynamic = "force-dynamic";

export default async function FAQPage() {
  // Guarantee DB initialized
  await initializeDatabase();

  const faqs = await prisma.faq.findMany({
    orderBy: { createdAt: "asc" }
  });

  return <FaqClient initialFaqs={faqs} />;
}
