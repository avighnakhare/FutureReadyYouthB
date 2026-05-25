import { prisma } from "@/lib/db";
import { initializeDatabase } from "@/lib/init";
import ResourcesClient from "./ResourcesClient";

export const dynamic = "force-dynamic";

export default async function ResourcesPage() {
  // Guarantee DB initialized
  await initializeDatabase();

  const resources = await prisma.resource.findMany({
    orderBy: { createdAt: "desc" }
  });

  return <ResourcesClient initialResources={resources} />;
}
