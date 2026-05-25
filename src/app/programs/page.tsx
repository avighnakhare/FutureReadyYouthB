import { prisma } from "@/lib/db";
import { initializeDatabase } from "@/lib/init";
import ProgramsClient from "./ProgramsClient";

export const dynamic = "force-dynamic";

export default async function ProgramsPage() {
  // Guarantee DB is seeded
  await initializeDatabase();

  const programs = await prisma.program.findMany();

  return <ProgramsClient initialPrograms={programs} />;
}
