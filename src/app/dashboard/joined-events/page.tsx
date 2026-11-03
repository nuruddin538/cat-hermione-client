"use client";

import { authClient, useSession } from "@/lib/auth-client";
import type { CommunityEvent, JoinedEventsResponse } from "@/types/event";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const API_URL =
  process.env.NEXT_PUBLIC_SERVER_BASE_URL || "http://localhost:5000";

function formatTimestamp(value?: string | Date): string {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Dhaka",
  }).format(date);
}

export default function JoinedEventsPage() {
  const { data: session, isPending } = useSession();

  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      window.location.href = "/signin";
      return;
    }

    let cancelled = false;

    async function loadJoinedEvents() {
      try {
        setLoading(true);

        const { data, error } = await authClient.token();

        if (error || !data?.token) {
          throw new Error("Please sign in again.");
        }

        const response = await fetch(`${API_URL}/api/my-joined-events`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.token}`,
            Accept: "application/json",
          },
          cache: "no-store",
        });

        const result: JoinedEventsResponse = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to load joined events.");
        }

        if (!cancelled) {
          setEvents(result.events ?? []);
        }
      } catch (error: unknown) {
        if (!cancelled) {
          const message =
            error instanceof Error ? error.message : "Something went wrong.";

          toast.error(message);
          setEvents([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadJoinedEvents();

    return () => {
      cancelled = true;
    };
  }, [session, isPending]);

  if (isPending || loading) {
    return (
      <main className="min-h-screen bg-[#faf9f5] px-4 py-12 dark:bg-[#101b17]">
        <div className="mx-auto max-w-7xl animate-pulse">
          <h1 className="text-2xl font-bold text-[#173f35] dark:text-white">
            Loading joined events...
          </h1>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-64 rounded-2xl bg-gray-200 dark:bg-white/10"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#faf9f5] px-4 py-12 dark:bg-[#101b17] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-black text-[#173f35] dark:text-white">
          My Joined Events
        </h1>

        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Events you have joined, sorted by event date.
        </p>

        {events.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed p-10 text-center dark:border-white/15">
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              You have not joined any events yet.
            </p>

            <Link
              href="/upcoming-events"
              className="mt-4 inline-block rounded-full bg-[#174d3b] px-5 py-3 font-semibold text-white transition hover:bg-[#103b2d]"
            >
              Explore Upcoming Events
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event._id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:bg-[#172720]"
              >
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="h-48 w-full object-cover"
                  loading="lazy"
                />

                <div className="p-5">
                  <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                    {event.eventType}
                  </span>

                  <h2 className="mt-2 text-xl font-bold text-[#173f35] dark:text-white">
                    {event.title}
                  </h2>

                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                    📍 {event.location}
                  </p>

                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    📅 Event date: {formatTimestamp(event.eventDate)}
                  </p>

                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    🕒 Joined at: {formatTimestamp(event.joinedAt)}
                  </p>

                  <Link
                    href={`/upcoming-events/${event._id}`}
                    className="mt-5 inline-block font-semibold text-emerald-800 hover:underline dark:text-emerald-300"
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
