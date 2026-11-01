import { CommunityEvent } from "@/types/event";
import Link from "next/link";

const API_URL =
  process.env.NEXT_PUBLIC_SERVER_BASE_URL || "http://localhost:5000";

async function getRecentEvents(): Promise<CommunityEvent[]> {
  try {
    const response = await fetch(`${API_URL}/api/events/recent`, {
      cache: "no-store",
    });
    if (!response.ok) {
      console.error("Failed to fetch recent events:", response.status);
      return [];
    }
    const data = await response.json();
    return Array.isArray(data.events) ? data.events.slice(0, 6) : [];
  } catch (error) {
    console.error("Recent events API error:", error);
    return [];
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "Date to be announced";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(date);
}

export default async function RecentEventsSection() {
  const events = await getRecentEvents();

  return (
    <section
      id="upcoming-events"
      className="bg-[#f8f7f1] px-5 py-20 dark:bg-[#101b17] sm:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#ed795f]">
              Make a difference
            </p>
            <h2 className="mt-3 text-3xl font-bold text-[#173f35] dark:text-white sm:text-4xl">
              Find your next good deed.
            </h2>
            <p className="mt-3 max-w-xl leading-7 text-[#718075] dark:text-gray-300">
              Meaningful events are happening around you. Find one and be part
              of the change.
            </p>
          </div>
          <Link
            href="/events"
            className="inline-flex w-fit items-center gap-2 font-semibold text-[#285b43] transition hover:text-[#ed795f] dark:text-[#b9e6c8]"
          >
            View all events <span aria-hidden="true">↗</span>
          </Link>
        </div>
        {events.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event._id}
                className="group overflow-hidden rounded-3xl border border-[#e5e8df] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-[#192a21]"
              >
                <div className="relative">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#285b43]">
                    {event.eventType}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#718075] dark:text-gray-300">
                    <span>📅 {formatDate(event.eventDate)}</span>
                    <span>📍 {event.location}</span>
                  </div>
                  <h3 className="mt-4 line-clamp-2 text-xl font-bold text-[#173f35] dark:text-white">
                    {event.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 min-h-[72px] leading-6 text-[#718075] dark:text-gray-300">
                    {event.description}
                  </p>
                  <Link
                    href={`/events/${event._id}`}
                    className="mt-6 inline-flex items-center gap-2 font-semibold text-[#285b43] transition hover:gap-3 hover:text-[#ed795f] dark:text-[#b9e6c8]"
                  >
                    Explore event <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-[#cbd6c8] bg-white/60 px-6 py-14 text-center dark:border-white/15 dark:bg-white/[0.03]">
            <div className="text-4xl">🌱</div>
            <h3 className="mt-4 text-xl font-bold text-[#173f35] dark:text-white">
              Something good is growing.
            </h3>
            <p className="mx-auto mt-2 max-w-md leading-7 text-[#718075] dark:text-gray-300">
              No upcoming events yet. Be the first to bring your community
              together and create an initiative.
            </p>
            <Link
              href="/create-event"
              className="mt-6 inline-flex rounded-full bg-[#173f35] px-6 py-3 font-semibold text-white hover:bg-[#285b43]"
            >
              Create an event +
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
