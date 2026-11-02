import { CommunityEvent } from "@/types/event";
import Link from "next/link";

const API_URL =
  process.env.NEXT_PUBLIC_SERVER_BASE_URL || "http://localhost:5000";

async function getUpcomingEvents(): Promise<CommunityEvent[]> {
  try {
    const response = await fetch(`${API_URL}/api/events`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch upcoming events");
    }
    const result = await response.json();
    return result.success ? result.events : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Dhaka",
  }).format(new Date(date));
}
export default async function UpcomingEventsPage() {
  const events = await getUpcomingEvents();

  return (
    <main className="min-h-screen bg-[#faf9f5] px-4 py-14 dark:bg-[#101b17] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ed795f]">
            Find your purpose
          </p>
          <h1 className="mt-3 text-3xl font-black text-[#173f35] dark:text-white sm:text-5xl">
            Upcoming Events
          </h1>
          <p className="mt-4 max-w-2xl text-gray-600 dark:text-gray-300">
            Discover community activities, meet like-minded people, and make a
            meaningful difference.
          </p>
        </div>
        {events.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center dark:border-white/10 dark:bg-white/5">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              No upcoming events
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Check back soon or create an event for your community.
            </p>
            <Link
              href="/dashboard/create-event"
              className="mt-5 inline-flex rounded-full bg-[#174d3b] px-5 py-3 font-semibold text-white"
            >
              Create Event
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event._id}
                className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-[#172720]"
              >
                <div className="h-56 overflow-hidden bg-gray-100">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
                    {event.eventType}
                  </span>
                  <h2 className="mt-4 line-clamp-2 text-xl font-bold text-[#173f35] dark:text-white">
                    {event.title}
                  </h2>
                  <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <p>📍 {event.location}</p>
                    <p>📅 {formatDate(event.eventDate)}</p>
                  </div>
                  <Link
                    href={`/upcoming-events/${event._id}`}
                    className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#174d3b] px-5 py-3 font-bold text-white transition hover:bg-[#23674f]"
                  >
                    View Event →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
