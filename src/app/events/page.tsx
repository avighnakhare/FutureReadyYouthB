import { prisma } from "@/lib/db";
import { initializeDatabase } from "@/lib/init";
import EventsClient from "./EventsClient";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  // Guarantee DB initialized
  await initializeDatabase();

  const events = await prisma.event.findMany({
    orderBy: { date: "asc" }
  });

  return <EventsClient initialEvents={events} />;
}
