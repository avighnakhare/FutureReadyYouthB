import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import AdminClient from "./AdminClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard - Future Ready Youth",
  description: "Configure metrics, coordinate events, modify site parameters, and view volunteer submissions.",
};

export default async function AdminPage() {
  // 1. Verify Administrative Auth Session
  const user = await getCurrentUser();
  if (!user) {
    redirect("/admin/login");
  }

  // 2. Query SQLite Database for all CMS elements
  const metrics = await prisma.systemMetric.findUnique({
    where: { id: "metrics" }
  }) || {
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

  const content = await prisma.content.findMany();
  const volunteers = await prisma.volunteer.findMany({
    orderBy: { createdAt: "desc" }
  });

  const events = await prisma.event.findMany({
    include: {
      registration: true
    },
    orderBy: { date: "asc" }
  });

  const resources = await prisma.resource.findMany({
    orderBy: { createdAt: "desc" }
  });

  const faqs = await prisma.faq.findMany({
    orderBy: { createdAt: "asc" }
  });

  const programs = await prisma.program.findMany();

  // 3. Render Dashboard Client Component
  return (
    <AdminClient
      user={{ username: user.username, mustChangePassword: user.mustChangePassword }}
      initialMetrics={metrics}
      initialContent={content}
      initialVolunteers={volunteers}
      initialEvents={events}
      initialResources={resources}
      initialFaqs={faqs}
      initialPrograms={programs}
    />
  );
}
