import { prisma } from "@/lib/db";
import { initializeDatabase } from "@/lib/init";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Self-healing database initialization ensure
  await initializeDatabase();
  
  // Load metrics from SQLite database
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

  // Load key-value CMS site content
  const contents = await prisma.content.findMany();
  const contentMap = contents.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  return <HomeClient metrics={metrics} contentMap={contentMap} />;
}
