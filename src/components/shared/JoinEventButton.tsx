"use client"

import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const API_URL =
  process.env.NEXT_PUBLIC_SERVER_BASE_URL || "http://localhost:5000";

export default function JoinEventButton({ eventId }: { eventId: string }) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [joining, setJoining] = useState(false);

  async function handleJoin() {
    if (!session?.user) {
      toast.error("Plese sign in to join this event.");
      router.push("/signin");
      return;
    }
    if (joining) return;
    setJoining(true);

    try {
      const { data, error } = await authClient.token();
      if (error || !data?.token) {
        toast.error("Unable to verify your session. Please sign in again.");
        return;
      }
      const response = await fetch(
        `${API_URL}/api/events/${encodeURIComponent(eventId)}/join`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${data.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message || "Could not join this event.");
        return;
      }
      toast.success(result.message || "Successfully joined the event!");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setJoining(false);
    }
  }
  return (
    <button
      type="button"
      onClick={handleJoin}
      disabled={isPending || joining}
      className="w-full rounded-full bg-[#174d3b] px-6 py-3.5 font-bold text-white transition hover:bg-[#23674f] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
    >
      {isPending
        ? "Checking session..."
        : joining
        ? "Joining..."
        : session?.user
        ? "Join Event"
        : "Sign in to Join"}
    </button>
  );
}
