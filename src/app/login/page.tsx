"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const requestedRedirect = searchParams.get("callbackUrl");
  const redirectTo =
    requestedRedirect?.startsWith("/") && !requestedRedirect.startsWith("//")
      ? requestedRedirect
      : "/";

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || !password) {
      toast.error("Enter your email and password");
      return;
    }
    setLoading(true);
    try {
      const { error } = await authClient.signIn.email({
        email: email.trim(),
        password,
      });
      if (error) {
        toast.error(error.message || "Invalid email or password.");
        return;
      }
      toast.success("Welcome back!");
      router.replace(redirectTo);
      router.refresh();
    } catch {
      toast.error("Unable to sign in Please try again.");
    } finally {
      setLoading(false);
    }
  }
  async function handleGoogleLogin() {
    setGoogleLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: redirectTo,
      });
      if (error) {
        toast.error(error.message || "Google login failed.");
        setGoogleLoading(false);
      }
    } catch {
      toast.error("Unable to start Google login.");
      setGoogleLoading(false);
    }
  }
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#f7f7f2] px-4 py-12">
      <section className="w-full max-w-md rounded-3xl border border-[#e3e8df] bg-white p-6 shadow-xl sm:p-9">
        <Link href="/" className="font-bold text-[#174b3a]">
          🐾 Cat-Hermione
        </Link>
      </section>
    </main>
  );
};

export default LoginForm;
