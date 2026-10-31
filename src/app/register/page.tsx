import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

const RegisterPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail || !password) {
      toast.error("Please fill in all required fields.");
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
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
    if (photoURL.trim()) {
      try {
        const parsedURL = new URL(photoURL.trim());
        if (parsedURL.protocol !== "https:" && parsedURL.protocol !== "http:") {
          toast.error("Photo URL must start with HTTP or HTTPS.");
          return;
        }
      } catch (error) {
        toast.error("Please enter a valid photo URL.");
        return;
      }
    }
    setLoading(true);
    try {
      const { error } = await authClient.signUp.email({
        name: trimmedName,
        email: trimmedEmail,
        password,
        ...(photoURL.trim() ? { image: photoURL.trim() } : {}),
      });
      if (error) {
        toast.error(error.message || "Registration failed");
        return;
      }
      toast.success("Account created successfully!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again");
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f7f2] px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-6 shadow-xl sm:p-9">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tight text-[#174b3a]"
          >
            🐾 Cat-Hermione
          </Link>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Join our community
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Create an account and make a difference.
          </p>
        </div>
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              autoComplete="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={100}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#174b3a] focus:ring-2 focus:ring-[#174b3a]/15"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#174b3a] focus:ring-2 focus:ring-[#174b3a]/15"
            />
          </div>
          <div>
            <label
              htmlFor="photoURL"
              className="mb-2 block text-sm font-medium"
            >
              Profile photo URL
              <span className="ml-1 text-gray-400">(optional)</span>
            </label>
            <input
              id="photoURL"
              type="url"
              placeholder="https://example.com/photo.jpg"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#174b3a] focus:ring-2 focus:ring-[#174b3a]/15"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              autoComplete="new-password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#174b3a] focus:ring-2 focus:ring-[#174b3a]/15"
            />
            <p className="mt-2 text-xs leading-5 text-gray-500">
              At least 6 characters, including one uppercase and one lowercase
              letter.
            </p>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#174b3a] px-4 py-3 font-semibold text-white transition hover:bg-[#10382b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#174b3a] hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
};

export default RegisterPage;
