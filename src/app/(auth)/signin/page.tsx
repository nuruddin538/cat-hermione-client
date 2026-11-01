"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  HeartHandshake,
  LoaderCircle,
} from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import AuthBrandPanel from "../_components/AuthBrandPanel";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const result = await signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (result.error) {
        toast.error(result.error.message || "Unable to sign in.");
        return;
      }

      toast.success("Welcome back! You're signed in.");
      router.replace("/");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    if (googleLoading) return;
    setGoogleLoading(true);
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      toast.error("Google sign-in could not be started.");
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#faf9f5] px-4 py-6 text-[#183b31] dark:bg-[#101b17] dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-7xl overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-xl shadow-black/[0.04] dark:border-white/10 dark:bg-[#14221b] lg:grid-cols-2">
        <AuthBrandPanel mode="signin" />

        <section className="flex items-center justify-center px-5 py-12 sm:px-12 lg:px-14">
          <div className="w-full max-w-md">
            <Link
              href="/"
              className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#ed795f] lg:hidden"
            >
              <HeartHandshake size={21} />
              impactora.
            </Link>

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ed795f]">
              Your community awaits
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Welcome
              <br />
              <span className="font-serif italic font-normal text-[#ed795f]">
                back.
              </span>
            </h1>

            <p className="mt-4 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Sign in to find events and reconnect with your community.
            </p>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 px-4 py-3.5 text-sm font-bold transition hover:bg-gray-50 dark:border-white/15 dark:hover:bg-white/5"
            >
              <svg viewBox="0 0 48 48" className="size-5" aria-hidden="true">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.4 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.3 13.6 17.7 9.5 24 9.5Z"
                  transform="translate(0 4)"
                />
                <path
                  fill="#4285F4"
                  d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.7 6.9l7.5 5.8c4.4-4.1 6.9-10.1 6.9-17.2Z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.4 28.7a14.7 14.7 0 0 1 0-9.4l-7.8-6.1a24 24 0 0 0 0 21.6l7.8-6.1Z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.5 0 12-2.1 16-6.3l-7.5-5.8c-2.1 1.4-4.8 2.3-8.5 2.3-6.3 0-11.7-4.1-13.6-9.8l-7.8 6.1C6.5 42.6 14.6 48 24 48Z"
                />
              </svg>
              Continue with Google
            </button>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200 dark:bg-white/10" />
              <span className="text-xs font-medium text-gray-400">
                OR WITH EMAIL
              </span>
              <div className="h-px flex-1 bg-gray-200 dark:bg-white/10" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-bold">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-200 bg-[#faf9f5] px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#43866b] focus:ring-4 focus:ring-emerald-900/5 dark:border-white/10 dark:bg-white/5"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-bold">
                    Password
                  </label>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-gray-200 bg-[#faf9f5] px-4 py-3.5 pr-12 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#43866b] focus:ring-4 focus:ring-emerald-900/5 dark:border-white/10 dark:bg-white/5"
                  />

                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#174d3b] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#23674f] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <LoaderCircle className="animate-spin" size={18} />
                ) : (
                  <>
                    Sign in to your account
                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
              New to Impactora?{" "}
              <Link
                href="/signup"
                className="font-bold text-[#d86b53] hover:underline"
              >
                Create an account
              </Link>
            </p>

            <p className="mt-8 text-center text-xs leading-5 text-gray-400">
              By continuing, you agree to help build a kinder community.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
