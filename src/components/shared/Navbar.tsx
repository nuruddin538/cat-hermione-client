"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  HeartHandshake,
  LogOut,
  Menu,
  Moon,
  Sun,
  UserRound,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const { theme, setTheme } = useTheme();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const user = session?.user;

  async function handleLogout() {
    await signOut();
    window.location.href = "/";
  }

  const links = [{ href: "/upcoming-events", label: "Discover Events" }];

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-950/10 bg-[#faf9f5]/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#101b17]/90">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-[#174d3b] text-white shadow-lg shadow-emerald-950/10 transition-transform group-hover:-rotate-6">
            <HeartHandshake size={24} />
          </span>

          <span>
            <span className="block text-xl font-black tracking-tight text-[#173f35] dark:text-white">
              impactora<span className="text-[#f17a61]">.</span>
            </span>
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.19em] text-gray-500 sm:block">
              Small acts. Lasting impact.
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-gray-600 transition-colors hover:text-[#ed795f] dark:text-gray-300"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/#our-mission"
            className="text-sm font-semibold text-gray-600 transition-colors hover:text-[#ed795f] dark:text-gray-300"
          >
            Our Mission
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Toggle color theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex size-10 items-center justify-center rounded-full border border-black/10 transition hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {!isPending && !user && (
            <div className="hidden items-center gap-3 sm:flex">
              <Link
                href="/signin"
                className="px-3 py-2 text-sm font-bold text-[#173f35] dark:text-white"
              >
                Sign in
              </Link>

              <Link
                href="/signup"
                className="group inline-flex items-center gap-2 rounded-full bg-[#174d3b] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#23674f]"
              >
                Get involved
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          )}

          {isPending && (
            <div className="hidden h-10 w-28 animate-pulse rounded-full bg-black/10 sm:block dark:bg-white/10" />
          )}

          {!isPending && user && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                onMouseEnter={() => setProfileOpen(true)}
                aria-expanded={profileOpen}
                aria-label="Open profile menu"
                className="group flex items-center gap-2 rounded-full border border-black/10 p-1.5 pr-3 dark:border-white/15"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt=""
                    className="size-9 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex size-9 items-center justify-center rounded-full bg-[#e5ede5] text-[#174d3b]">
                    <UserRound size={19} />
                  </span>
                )}

                <span className="hidden max-w-28 truncate text-sm font-bold sm:block">
                  {user.name || "My account"}
                </span>

                <ChevronDown size={15} />
              </button>

              {profileOpen && (
                <div
                  onMouseLeave={() => setProfileOpen(false)}
                  className="absolute right-0 top-full mt-3 w-64 rounded-2xl border border-black/10 bg-white p-2 shadow-2xl shadow-black/10 dark:border-white/10 dark:bg-[#172720]"
                >
                  <div className="border-b border-black/5 px-3 py-3 dark:border-white/10">
                    <p className="truncate font-bold">
                      {user.name || "Community member"}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>

                  {[
                    {
                      href: "/dashboard",
                      label: "Dashboard",
                      icon: UserRound,
                    },
                    {
                      href: "/dashboard/create-event",
                      label: "Create event",
                      icon: CalendarDays,
                    },
                    {
                      href: "/dashboard/manage-events",
                      label: "Manage events",
                      icon: CalendarDays,
                    },
                    {
                      href: "/dashboard/joined-events",
                      label: "Joined events",
                      icon: HeartHandshake,
                    },
                  ].map(({ href, label, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition hover:bg-emerald-50 dark:hover:bg-white/5"
                    >
                      <Icon size={17} />
                      {label}
                    </Link>
                  ))}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-rose-600 transition hover:bg-rose-50 dark:hover:bg-rose-950/30"
                  >
                    <LogOut size={17} />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex size-10 items-center justify-center rounded-full border border-black/10 md:hidden dark:border-white/15"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-black/5 px-5 py-5 md:hidden dark:border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-3 font-semibold hover:bg-black/5 dark:hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/#our-mission"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3 py-3 font-semibold hover:bg-black/5 dark:hover:bg-white/5"
            >
              Our Mission
            </Link>

            {!isPending && !user && (
              <>
                <Link
                  href="/signin"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-3 py-3 font-semibold"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl bg-[#174d3b] px-4 py-3 text-center font-bold text-white"
                >
                  Get involved
                </Link>
              </>
            )}

            {!isPending && user && (
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl px-3 py-3 text-left font-semibold text-rose-600"
              >
                <LogOut size={18} />
                Sign out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
