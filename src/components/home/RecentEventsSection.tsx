import Link from "next/link";
import type { CommunityEvent } from "@/types/event";

const API_URL =
  process.env.NEXT_PUBLIC_SERVER_BASE_URL || "http://localhost:8000";

async function getRecentEvents(): Promise<CommunityEvent[]> {
  try {
    const response = await fetch(`${API_URL}/api/events/recent`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch recent events");
    }

    const result: {
      success: boolean;
      events: CommunityEvent[];
    } = await response.json();

    return result.events ?? [];
  } catch (error) {
    console.error("Recent events fetch error:", error);
    return [];
  }
}

function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default async function RecentEventsSection() {
  const events = await getRecentEvents();

  return (
    <section
      id="recent-events"
      className="bg-[#faf9f5] px-4 py-16 dark:bg-[#101b17] sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#ed795f]">
              Small acts. Lasting impact.
            </p>

            <h2 className="text-3xl font-black tracking-tight text-[#173f35] dark:text-white sm:text-4xl">
              Recent Upcoming Events
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-base">
              Discover meaningful community events and join people making a
              positive difference.
            </p>
          </div>

          <Link
            href="/upcoming-events"
            className="inline-flex w-fit items-center justify-center rounded-full bg-[#174d3b] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#23674f]"
          >
            Discover All Events →
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-5 py-12 text-center dark:border-white/15 dark:bg-white/5">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              No Upcoming Events Yet
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-600 dark:text-gray-300">
              There are no upcoming events to display right now. Create an event
              and inspire your community.
            </p>

            <Link
              href="/dashboard/create-event"
              className="mt-6 inline-flex rounded-full bg-[#174d3b] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#23674f]"
            >
              + Create an Event
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.slice(0, 6).map((event) => (
              <article
                key={event._id}
                className="group overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-[#172720]"
              >
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#174d3b] shadow-sm">
                    {event.eventType}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="line-clamp-2 text-xl font-bold text-[#173f35] dark:text-white">
                    {event.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    {event.description}
                  </p>

                  <div className="mt-5 space-y-3 border-t border-gray-100 pt-4 text-sm text-gray-600 dark:border-white/10 dark:text-gray-300">
                    <p>
                      <span className="mr-2" aria-hidden="true">
                        📅
                      </span>
                      {formatDate(event.eventDate)}
                    </p>

                    <p className="line-clamp-1">
                      <span className="mr-2" aria-hidden="true">
                        📍
                      </span>
                      {event.location}
                    </p>
                  </div>

                  <Link
                    href="/upcoming-events"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#174d3b] transition hover:text-[#ed795f] dark:text-emerald-300"
                  >
                    Discover Events <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
