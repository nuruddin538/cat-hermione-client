import Link from "next/link";
import { notFound } from "next/navigation";
import JoinEventButton from "@/components/shared/JoinEventButton";
import type { CommunityEvent } from "@/types/event";

const API_URL =
  process.env.NEXT_PUBLIC_SERVER_BASE_URL || "http://localhost:5000";

async function getEvent(id: string): Promise<CommunityEvent | null> {
  try {
    const response = await fetch(
      `${API_URL}/api/events/${encodeURIComponent(id)}`,
      { cache: "no-store" }
    );

    if (response.status === 404) return null;
    if (!response.ok) throw new Error("Failed to fetch event");

    const result = await response.json();
    return result.success ? result.event : null;
  } catch (error) {
    console.error("Event details error:", error);
    return null;
  }
}

function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("en-BD", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Dhaka",
  }).format(new Date(date));
}

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) notFound();

  return (
    <main className="min-h-screen bg-[#faf9f5] px-4 py-12 dark:bg-[#101b17] sm:px-6">
      <article className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-white shadow-sm dark:bg-[#172720]">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="h-64 w-full object-cover sm:h-96"
        />

        <div className="p-6 sm:p-10">
          <Link
            href="/upcoming-events"
            className="text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-300"
          >
            ← Back to Upcoming Events
          </Link>

          <span className="mt-6 inline-block rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-800">
            {event.eventType}
          </span>

          <h1 className="mt-4 text-3xl font-black text-[#173f35] dark:text-white sm:text-4xl">
            {event.title}
          </h1>

          <div className="mt-5 space-y-3 text-gray-600 dark:text-gray-300">
            <p>📍 {event.location}</p>
            <p>📅 {formatDate(event.eventDate)}</p>
          </div>

          <div className="my-8 border-t border-gray-200 dark:border-white/10" />

          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            About This Event
          </h2>

          <p className="mt-3 whitespace-pre-line leading-8 text-gray-600 dark:text-gray-300">
            {event.description}
          </p>

          <div className="mt-8">
            <JoinEventButton eventId={event._id} />
          </div>
        </div>
      </article>
    </main>
  );
}
