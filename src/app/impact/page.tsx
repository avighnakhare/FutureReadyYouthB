import { prisma } from "@/lib/db";
import { initializeDatabase } from "@/lib/init";
import ImpactClient from "./ImpactClient";

export const dynamic = "force-dynamic";

export default async function ImpactPage() {
  // Guarantee DB initialized
  await initializeDatabase();

  let metrics = await prisma.systemMetric.findUnique({
    where: { id: "metrics" }
  });

  if (!metrics) {
    metrics = {
      id: "metrics",
      studentsReached: 0,
      volunteersEngaged: 0,
      serviceHours: 0,
      communityProjects: 0,
      eventsHosted: 0,
      mentors: 0,
      donationsReceived: 0,
      resourcesDistributed: 0,
      partnerships: 0
    };
  }

  return <ImpactClient metrics={metrics} />;
}
