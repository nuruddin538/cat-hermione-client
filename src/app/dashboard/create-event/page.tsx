"use client";

import { authClient } from "@/lib/auth-client";
import { router } from "better-auth/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

const initialForm = {
  title: "",
  description: "",
  eventType: "",
  imageUrl: "",
  location: "",
  eventDate: "",
};

const eventTypes = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Education",
  "Community Service",
  "Other",
];

function getLocalDateTimeMin() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 16);
}

export default function CreateEventPage() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [minDateTime, setMinDateTime] = useState(() => getLocalDateTimeMin());

  const update = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };
  // Refresh the date limit when the user starts interacting.
  function refreshMinDateTime() {
    setMinDateTime(getLocalDateTimeMin());
  }
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    const { title, description, eventType, imageUrl, location, eventDate } =
      form;

    if (
      !title.trim() ||
      !description.trim() ||
      !eventType ||
      !imageUrl.trim() ||
      !location.trim() ||
      !eventDate
    ) {
      toast.error("Please complete all event fields");
      return;
    }
    if (new Date(eventDate).getTime() <= Date.now()) {
      toast.error("Plese select a future event date and time");
      return;
    }
    try {
      setLoading(true);
      const { data: tokenData, error: tokenError } = await authClient.token();
      if (tokenError || !tokenData?.token) {
        toast.error("Please sign in before creating an event.");
        router.push("/signin");
        return;
      }
      const apiUrl =
        process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.token}`,
        },
        body: JSON.stringify({
          ...form,
          title: title.trim(),
          description: description.trim(),
          imageUrl: imageUrl.trim(),
          location: location.trim(),
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        toast.error(result.message || "Failed to create event.");
        return;
      }
      toast.success("Your event has been created successfully!");
      setForm(initialForm);
      // router.push("/events");
      // router.refresh();
    } catch (error) {
      toast.error("Could not create the event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f7f1] px-4 py-12 dark:bg-[#101b17] sm:px-6 lg:py-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#547061] hover:text-[#ed795f] dark:text-gray-300"
        >
          <span aria-hidden="true">←</span> Back to home
        </Link>
        <div className="mt-7 overflow-hidden rounded-[2rem] border border-[#e4e8df] bg-white shadow-sm dark:border-white/10 dark:bg-[#192a21]">
          <div className="bg-[#173f35] px-6 py-9 text-white sm:px-10 sm:py-11">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f8b6a5]">
              Start something meaningful
            </p>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              Create an event<span className="text-[#ed795f]">.</span>
            </h1>
            <p className="mt-3 max-w-lg leading-7 text-white/70">
              Bring people together around a cause. Share your idea and invite
              your community to make a difference.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            onFocus={refreshMinDateTime}
            className="space-y-6 p-6 sm:p-10"
          >
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-semibold text-[#173f35] dark:text-white"
              >
                Event title
              </label>
              <input
                id="title"
                name="title"
                required
                maxLength={120}
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="w-full rounded-xl border border-[#dce3d9] bg-[#fcfcf9] px-4 py-3 text-[#173f35] outline-none transition focus:border-[#285b43] focus:ring-2 focus:ring-[#285b43]/10 dark:border-white/15 dark:bg-white/5 dark:text-white"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-[#173f35] dark:text-white"
              >
                Event description
              </label>
              <textarea
                name="description"
                id="description"
                required
                minLength={10}
                maxLength={3000}
                rows={5}
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="Tell people what the event is about and how they can participate..."
                className="w-full resize-y rounded-xl border border-[#dce3d9] bg-[#fcfcf9] px-4 py-3 text-[#173f35] outline-none transition focus:border-[#285b43] focus:ring-2 focus:ring-[#285b43]/10 dark:border-white/15 dark:bg-white/5 dark:text-white"
              ></textarea>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="eventType"
                  className="mb-2 block text-sm font-semibold text-[#173f35] dark:text-white"
                >
                  Event type
                </label>
                <select
                  name="eventType"
                  id="eventType"
                  required
                  value={form.eventType}
                  onChange={(e) => update("eventType", e.target.value)}
                  className="w-full rounded-xl border border-[#dce3d9] bg-[#fcfcf9] px-4 py-3 text-[#173f35] outline-none focus:border-[#285b43] dark:border-white/15 dark:bg-[#192a21] dark:text-white"
                >
                  <option value="">Select event type</option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="eventDate"
                  className="mb-2 block text-sm font-semibold text-[#173f35] dark:text-white"
                >
                  Event date and time
                </label>
                <input
                  id="eventDate"
                  name="eventDate"
                  type="datetime-local"
                  required
                  min={minDateTime || undefined}
                  value={form.eventDate}
                  onChange={(e) => update("eventDate", e.target.value)}
                  onFocus={refreshMinDateTime}
                  className="w-full min-w-0 rounded-xl border border-[#dce3d9] bg-[#fcfcf9] px-3 py-3 text-[#173f35] outline-none focus:border-[#285b43] dark:border-white/15 dark:bg-white/5 dark:text-white"
                />
                <p className="mt-2 text-xs text-[#718075] dark:text-gray-400">
                  Choose a future date and time.
                </p>
              </div>
            </div>
            <div>
              <label
                htmlFor="local"
                className="mb-2 block text-sm font-semibold text-[#173f35] dark:text-white"
              >
                Event location
              </label>
              <input
                id="local"
                name="location"
                required
                maxLength={200}
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                placeholder="e.g. DC Hill, Chattogram"
                className="w-full rounded-xl border border-[#dce3d9] bg-[#fcfcf9] px-4 py-3 text-[#173f35] outline-none focus:border-[#285b43] dark:border-white/15 dark:bg-white/5 dark:text-white"
              />
            </div>
            <div>
              <label
                htmlFor="imageUrl"
                className="mb-2 block text-sm font-semibold text-[#173f35] dark:text-white"
              >
                Thumbnail image URL
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                required
                value={form.imageUrl}
                onChange={(e) => update("imageUrl", e.target.value)}
                placeholder="https://example.com/event-image.jpg"
                className="w-full rounded-xl border border-[#dce3d9] bg-[#fcfcf9] px-4 py-3 text-[#173f35] outline-none focus:border-[#285b43] dark:border-white/15 dark:bg-white/5 dark:text-white"
              />
              {form.imageUrl && (
                <div className="mt-4 overflow-hidden rounded-xl border border-[#e4e8df] dark:border-white/10">
                  <img
                    src={form.imageUrl}
                    alt="Event thumbnail preview"
                    className="h-48 w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    onLoad={(e) => {
                      e.currentTarget.style.display = "block";
                    }}
                  />
                </div>
              )}
            </div>
            <div className="border-t border-[#e8ebe4] pt-6 dark:border-white/10">
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#173f35] px-6 py-4 font-bold text-white transition hover:bg-[#285b43] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#b9e6c8] dark:text-[#173f35]"
              >
                {loading ? "Creating event..." : "Publish event"}
                {!loading && <span aria-hidden="true">↗</span>}
              </button>
              <p className="mt-4 text-center text-xs leading-5 text-[#718075] dark:text-gray-400">
                By publishing, you confirm that the event information is
                accurate and the date is in the future.
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
