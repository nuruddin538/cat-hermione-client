"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Eye, EyeOff, LoaderCircle, X } from "lucide-react";
import { signIn, signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import AuthBrandPanel from "../_components/AuthBrandPanel";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordRules = [
    {
      label: "At least 6 characters",
      valid: password.length >= 6,
    },
    {
      label: "One uppercase letter",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "One lowercase letter",
      valid: /[a-z]/.test(password),
    },
  ];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain an uppercase letter.");
      return;
    }

    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain a lowercase letter.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      new URL(photoURL);
    } catch {
      toast.error("Please enter a valid profile photo URL.");
      return;
    }

    setLoading(true);

    try {
      const result = await signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        image: photoURL.trim(),
      });

      if (result.error) {
        toast.error(result.error.message || "Unable to create your account.");
        return;
      }

      toast.success("Your account has been created successfully!");
      router.replace("/");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignup() {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      toast.error("Google sign-up could not be started.");
    }
  }

  return (
    <main className="min-h-screen bg-[#faf9f5] px-4 py-6 text-[#183b31] dark:bg-[#101b17] dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-7xl overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-xl shadow-black/[0.04] dark:border-white/10 dark:bg-[#14221b] lg:grid-cols-2">
        <AuthBrandPanel mode="signup" />

        <section className="flex items-center justify-center px-5 py-10 sm:px-12 lg:px-14">
          <div className="w-full max-w-md">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ed795f]">
              Become part of something good
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Make room
              <br />
              for{" "}
              <span className="font-serif italic font-normal text-[#ed795f]">
                good.
              </span>
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Create your account and discover ways to make a difference.
            </p>

            <button
              type="button"
              onClick={handleGoogleSignup}
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 px-4 py-3.5 text-sm font-bold transition hover:bg-gray-50 dark:border-white/15 dark:hover:bg-white/5"
            >
              <span className="text-base font-black text-[#4285F4]">G</span>
              Continue with Google
            </button>

            <div className="my-5 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200 dark:bg-white/10" />
              <span className="text-xs font-medium text-gray-400">
                OR CREATE WITH EMAIL
              </span>
              <div className="h-px flex-1 bg-gray-200 dark:bg-white/10" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-bold">
                  Full name
                </label>
                <input
                  id="name"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="How should we call you?"
                  className="w-full rounded-xl border border-gray-200 bg-[#faf9f5] px-4 py-3 text-sm outline-none transition focus:border-[#43866b] focus:ring-4 focus:ring-emerald-900/5 dark:border-white/10 dark:bg-white/5"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-bold">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-200 bg-[#faf9f5] px-4 py-3 text-sm outline-none transition focus:border-[#43866b] focus:ring-4 focus:ring-emerald-900/5 dark:border-white/10 dark:bg-white/5"
                />
              </div>

              <div>
                <label
                  htmlFor="photoURL"
                  className="mb-2 block text-sm font-bold"
                >
                  Profile photo URL
                </label>
                <input
                  id="photoURL"
                  type="url"
                  required
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full rounded-xl border border-gray-200 bg-[#faf9f5] px-4 py-3 text-sm outline-none transition focus:border-[#43866b] focus:ring-4 focus:ring-emerald-900/5 dark:border-white/10 dark:bg-white/5"
                />
                {photoURL && (
                  <div className="mt-3 flex items-center gap-3">
                    <img
                      src={photoURL}
                      alt="Profile preview"
                      className="size-11 rounded-full border border-gray-200 object-cover"
                      onError={(e) => {
                        e.currentTarget.style.visibility = "hidden";
                      }}
                      onLoad={(e) => {
                        e.currentTarget.style.visibility = "visible";
                      }}
                    />
                    <span className="text-xs text-gray-500">
                      Profile photo preview
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-bold"
                >
                  Create password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className="w-full rounded-xl border border-gray-200 bg-[#faf9f5] px-4 py-3 pr-12 text-sm outline-none transition focus:border-[#43866b] focus:ring-4 focus:ring-emerald-900/5 dark:border-white/10 dark:bg-white/5"
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

                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {passwordRules.map((rule) => (
                    <p
                      key={rule.label}
                      className={`flex items-center gap-2 text-xs ${
                        rule.valid ? "text-emerald-600" : "text-gray-400"
                      }`}
                    >
                      {rule.valid ? <Check size={14} /> : <X size={14} />}
                      {rule.label}
                    </p>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#174d3b] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#23674f] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <LoaderCircle size={18} className="animate-spin" />
                ) : (
                  <>
                    Create my account
                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              Already part of the community?{" "}
              <Link
                href="/signin"
                className="font-bold text-[#d86b53] hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
