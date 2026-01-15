export const dynamic = 'force-dynamic';
// 1. Remove or comment out the prisma import to stop the connection crash
// import { prisma } from "@/lib/prisma"; 
import CopyLinkButton from "./components/CopyLinkButton";

export default async function Home() {
  // MOCK DATA - Guaranteed to work regardless of DB status
  const user = {
    id: "1", // Changed to String to match standard Supabase IDs
    username: "kavya",
    eventTypes: [
      {
        id: "1",
        title: "30 Min Meeting",
        slug: "30-min",
        duration: 30,
        description: "A quick catch-up or intro call.",
      },
      {
        id: "2",
        title: "Consultation",
        slug: "consultation",
        duration: 60,
        description: "Deep dive into your project.",
      },
    ],
  };

  // We are skipping the DB call entirely for now to get you back to 'Working'
  /*
  const userFromDb = await prisma.user.findUnique({
    where: { id: "1" }, 
    include: { eventTypes: true },
  });
  */

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8 bg-black min-h-screen">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">
          Welcome, {user.username}
        </h1>
        <a
          href="/event-types/new"
          className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-200"
        >
          New Event Type
        </a>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {user.eventTypes.map((eventType) => {
          // Construct the full URL for the copy button
          const href = `/${user.username}/${eventType.slug}`;
          return (
            <div
              key={eventType.id}
              className="rounded-lg bg-[#1a1a1a] border border-gray-800 p-6 shadow-sm transition-shadow hover:shadow-md hover:border-gray-700"
            >
              <h2 className="mb-2 text-xl font-semibold text-white">
                {eventType.title}
              </h2>
              <p className="mb-3 text-sm font-medium text-gray-400">
                {eventType.duration} mins
              </p>
              {eventType.description && (
                <p className="mb-4 text-sm text-gray-400 line-clamp-2">
                  {eventType.description}
                </p>
              )}
              <CopyLinkButton href={href} />
            </div>
          );
        })}
      </div>
    </div>
  );
}