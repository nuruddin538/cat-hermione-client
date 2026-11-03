"use client";

import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import Link from "next/link";
import { toast } from "sonner";
import { authClient, useSession } from "@/lib/auth-client";
import type { CommunityEvent, EventType } from "@/types/event";

const API_URL =
  process.env.NEXT_PUBLIC_SERVER_BASE_URL || "http://localhost:8000";

const eventTypes: EventType[] = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Education",
  "Community Service",
  "Other",
];

type EventForm = {
  title: string;
  description: string;
  eventType: EventType;
  imageUrl: string;
  location: string;
  eventDate: string;
};

type ApiResponse<T> = {
  success?: boolean;
  message?: string;
  events?: T[];
  event?: T;
};

function toLocalDateTime(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const offset = date.getTimezoneOffset() * 60_000;

  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

function formatEventDate(value: string): string {
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

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Something went wrong.";
}

export default function ManageEventsPage() {
  const { data: session, isPending } = useSession();

  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [form, setForm] = useState<EventForm>({
    title: "",
    description: "",
    eventType: "Cleanup",
    imageUrl: "",
    location: "",
    eventDate: "",
  });

  const getToken = useCallback(async (): Promise<string> => {
    const { data, error } = await authClient.token();

    if (error || !data?.token) {
      throw new Error(
        "Your session could not be verified. Please sign in again."
      );
    }

    return data.token;
  }, []);

  const loadEvents = useCallback(async (): Promise<void> => {
    const token = await getToken();

    const response = await fetch(`${API_URL}/api/my-events`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const result: ApiResponse<CommunityEvent> = await response.json();

    if (!response.ok || result.success === false) {
      throw new Error(result.message || "Failed to load events.");
    }

    setEvents(result.events ?? []);
  }, [getToken]);

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      window.location.href = "/signin";
      return;
    }

    let cancelled = false;

    async function fetchMyEvents(): Promise<void> {
      try {
        setLoading(true);
        await loadEvents();
      } catch (error: unknown) {
        if (!cancelled) {
          toast.error(getErrorMessage(error));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void fetchMyEvents();

    return () => {
      cancelled = true;
    };
  }, [isPending, session, loadEvents]);

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function startEditing(event: CommunityEvent): void {
    setEditingId(event._id);

    setForm({
      title: event.title,
      description: event.description,
      eventType: event.eventType,
      imageUrl: event.imageUrl,
      location: event.location,
      eventDate: toLocalDateTime(event.eventDate),
    });
  }

  function cancelEditing(): void {
    setEditingId(null);
    setForm({
      title: "",
      description: "",
      eventType: "Cleanup",
      imageUrl: "",
      location: "",
      eventDate: "",
    });
  }

  async function handleUpdate(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    if (!editingId || saving) return;

    const eventTimestamp = new Date(form.eventDate).getTime();

    if (!Number.isFinite(eventTimestamp) || eventTimestamp <= Date.now()) {
      toast.error("Please select a valid future event date.");
      return;
    }

    if (!form.imageUrl.trim() || !form.location.trim()) {
      toast.error("Please complete all required fields.");
      return;
    }

    setSaving(true);

    try {
      const token = await getToken();

      const response = await fetch(
        `${API_URL}/api/my-events/${encodeURIComponent(editingId)}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            ...form,
            title: form.title.trim(),
            description: form.description.trim(),
            imageUrl: form.imageUrl.trim(),
            location: form.location.trim(),
            eventDate: new Date(form.eventDate).toISOString(),
          }),
        }
      );

      const result: ApiResponse<CommunityEvent> = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(result.message || "Failed to update event.");
      }

      toast.success("Event updated successfully!");
      setEditingId(null);

      await loadEvents();
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string): Promise<void> {
    if (deletingId) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) return;

    setDeletingId(id);

    try {
      const token = await getToken();

      const response = await fetch(
        `${API_URL}/api/my-events/${encodeURIComponent(id)}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const result: ApiResponse<CommunityEvent> = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(result.message || "Failed to delete event.");
      }

      setEvents((current) => current.filter((event) => event._id !== id));

      if (editingId === id) {
        cancelEditing();
      }

      toast.success("Event deleted successfully!");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    } finally {
      setDeletingId(null);
    }
  }

  if (isPending || loading) {
    return (
      <main className="min-h-screen bg-[#faf9f5] px-4 py-12 dark:bg-[#101b17]">
        <div className="mx-auto max-w-7xl animate-pulse">
          <h1 className="text-2xl font-bold text-[#173f35] dark:text-white">
            Loading your events...
          </h1>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {[1, 2].map((item) => (
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

  if (!session?.user) return null;

  return (
    <main className="min-h-screen bg-[#faf9f5] px-4 py-12 dark:bg-[#101b17] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-[#173f35] dark:text-white">
              Manage My Events
            </h1>

            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Update or delete events that you created.
            </p>
          </div>

          <Link
            href="/dashboard/create-event"
            className="rounded-full bg-[#174d3b] px-5 py-3 font-semibold text-white transition hover:bg-[#103b2d]"
          >
            + Create Event
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed p-10 text-center dark:border-white/15">
            <p className="font-semibold text-gray-700 dark:text-gray-200">
              You have not created any events yet.
            </p>

            <Link
              href="/dashboard/create-event"
              className="mt-4 inline-block font-semibold text-emerald-700 dark:text-emerald-300"
            >
              Create your first event →
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {events.map((event) => (
              <article
                key={event._id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-[#172720]"
              >
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="h-52 w-full object-cover"
                  loading="lazy"
                />

                <div className="p-5">
                  {editingId === event._id ? (
                    <form onSubmit={handleUpdate} className="space-y-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Title
                        <input
                          name="title"
                          required
                          maxLength={150}
                          value={form.title}
                          onChange={handleInputChange}
                          className="mt-1 w-full rounded-xl border p-3 text-gray-900"
                        />
                      </label>

                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Description
                        <textarea
                          name="description"
                          required
                          rows={4}
                          maxLength={5000}
                          value={form.description}
                          onChange={handleInputChange}
                          className="mt-1 w-full rounded-xl border p-3 text-gray-900"
                        />
                      </label>

                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Event Type
                        <select
                          name="eventType"
                          required
                          value={form.eventType}
                          onChange={handleInputChange}
                          className="mt-1 w-full rounded-xl border p-3 text-gray-900"
                        >
                          {eventTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Image URL
                        <input
                          name="imageUrl"
                          required
                          type="url"
                          value={form.imageUrl}
                          onChange={handleInputChange}
                          className="mt-1 w-full rounded-xl border p-3 text-gray-900"
                        />
                      </label>

                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Location
                        <input
                          name="location"
                          required
                          maxLength={250}
                          value={form.location}
                          onChange={handleInputChange}
                          className="mt-1 w-full rounded-xl border p-3 text-gray-900"
                        />
                      </label>

                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Event Date
                        <input
                          name="eventDate"
                          required
                          type="datetime-local"
                          min={toLocalDateTime(new Date().toISOString())}
                          value={form.eventDate}
                          onChange={handleInputChange}
                          className="mt-1 w-full rounded-xl border p-3 text-gray-900"
                        />
                      </label>

                      <div className="flex flex-wrap gap-3">
                        <button
                          type="submit"
                          disabled={saving}
                          className="rounded-full bg-[#174d3b] px-5 py-2.5 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {saving ? "Saving..." : "Save Changes"}
                        </button>

                        <button
                          type="button"
                          disabled={saving}
                          onClick={cancelEditing}
                          className="rounded-full border px-5 py-2.5 font-semibold disabled:opacity-50 dark:border-white/20 dark:text-white"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                        {event.eventType}
                      </span>

                      <h2 className="mt-2 text-xl font-bold text-[#173f35] dark:text-white">
                        {event.title}
                      </h2>

                      <p className="mt-2 whitespace-pre-line text-sm text-gray-600 dark:text-gray-300">
                        {event.description}
                      </p>

                      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                        📍 {event.location}
                      </p>

                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                        📅 {formatEventDate(event.eventDate)}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => startEditing(event)}
                          className="rounded-full bg-amber-500 px-5 py-2.5 font-semibold text-white transition hover:bg-amber-600"
                        >
                          Edit Event
                        </button>

                        <button
                          type="button"
                          disabled={deletingId !== null}
                          onClick={() => void handleDelete(event._id)}
                          className="rounded-full bg-red-600 px-5 py-2.5 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deletingId === event._id
                            ? "Deleting..."
                            : "Delete Event"}
                        </button>

                        <Link
                          href={`/upcoming-events/${event._id}`}
                          className="rounded-full border px-5 py-2.5 font-semibold dark:border-white/20 dark:text-white"
                        >
                          View Event
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
