"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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

const navLinks = [
  { href: "/upcoming-events", label: "Discover Events" },
  { href: "/#our-mission", label: "Our Mission" },
];

const profileLinks = [
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
];

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const { theme, setTheme } = useTheme();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const user = session?.user;
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function closeMenus() {
    setMenuOpen(false);
    setProfileOpen(false);
  }

  async function handleLogout() {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      await signOut();
      closeMenus();
      window.location.href = "/";
    } catch (error) {
      console.error("Sign out failed:", error);
      setLoggingOut(false);
    }
  }

  const linkClass =
    "rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-emerald-50 hover:text-[#174d3b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:text-gray-200 dark:hover:bg-white/10 dark:hover:text-white";

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-950/10 bg-[#faf9f5]/95 backdrop-blur-xl dark:border-white/10 dark:bg-[#101b17]/95">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:min-h-[76px] sm:gap-4 sm:px-6 lg:px-8"
      >
        {/* Brand */}
        <Link
          href="/"
          onClick={closeMenus}
          className="group flex min-w-0 shrink items-center gap-2 sm:gap-3"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#174d3b] text-white shadow-md transition-transform group-hover:-rotate-3 sm:size-11 sm:rounded-2xl">
            <HeartHandshake size={23} />
          </span>

          <span className="min-w-0">
            <span className="block text-lg font-black tracking-tight text-[#173f35] dark:text-white sm:text-xl">
              impactora<span className="text-[#f17a61]">.</span>
            </span>

            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500 sm:block sm:tracking-[0.19em]">
              Small acts. Lasting impact.
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-5 lg:flex xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm font-semibold text-gray-600 transition-colors hover:text-[#ed795f] dark:text-gray-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {/* Theme toggle */}
          <button
            type="button"
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            title="Toggle color theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-black/10 transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:border-white/15 dark:hover:bg-white/10"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Desktop authentication actions */}
          {!isPending && !user && (
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                href="/signin"
                className="rounded-full px-3 py-2.5 text-sm font-bold text-[#173f35] transition hover:bg-black/5 dark:text-white dark:hover:bg-white/10"
              >
                Sign in
              </Link>

              <Link
                href="/signup"
                className="group inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-[#174d3b] px-3 py-2.5 text-sm font-bold text-white transition hover:bg-[#23674f] sm:px-4 lg:px-5"
              >
                Get involved
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          )}

          {/* Loading placeholder */}
          {isPending && (
            <div className="hidden h-10 w-24 animate-pulse rounded-full bg-black/10 sm:block dark:bg-white/10" />
          )}

          {/* User profile dropdown */}
          {!isPending && user && (
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                aria-label="Open profile menu"
                aria-expanded={profileOpen}
                aria-haspopup="menu"
                onClick={() => setProfileOpen((open) => !open)}
                className="flex min-h-10 items-center gap-1.5 rounded-full border border-black/10 p-1 sm:gap-2 sm:pr-3 dark:border-white/15"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt=""
                    className="size-8 rounded-full object-cover sm:size-9"
                  />
                ) : (
                  <span className="flex size-8 items-center justify-center rounded-full bg-[#e5ede5] text-[#174d3b] sm:size-9">
                    <UserRound size={18} />
                  </span>
                )}

                <span className="hidden max-w-24 truncate text-sm font-bold sm:block">
                  {user.name || "My account"}
                </span>

                <ChevronDown
                  size={15}
                  className={`hidden transition-transform sm:block ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {profileOpen && (
                <div
                  role="menu"
                  aria-label="Account menu"
                  className="absolute right-0 top-full mt-3 w-[min(18rem,calc(100vw-1.5rem))] rounded-2xl border border-black/10 bg-white p-2 shadow-2xl shadow-black/10 dark:border-white/10 dark:bg-[#172720]"
                >
                  <div className="border-b border-black/5 px-3 py-3 dark:border-white/10">
                    <p className="truncate text-sm font-bold">
                      {user.name || "Community member"}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>

                  {profileLinks.map(({ href, label, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      role="menuitem"
                      onClick={closeMenus}
                      className="flex min-h-11 items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:hover:bg-white/5"
                    >
                      <Icon size={17} />
                      {label}
                    </Link>
                  ))}

                  <button
                    type="button"
                    role="menuitem"
                    disabled={loggingOut}
                    onClick={handleLogout}
                    className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60 dark:hover:bg-rose-950/30"
                  >
                    <LogOut size={17} />
                    {loggingOut ? "Signing out..." : "Sign out"}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-black/10 transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 md:hidden dark:border-white/15 dark:hover:bg-white/10"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile / tablet navigation */}
      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-black/5 bg-[#faf9f5] px-3 py-4 sm:px-6 sm:py-5 md:hidden dark:border-white/10 dark:bg-[#101b17]"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenus}
                className={linkClass}
              >
                {link.label}
              </Link>
            ))}

            {!isPending && !user && (
              <div className="mt-3 grid grid-cols-1 gap-2 border-t border-black/10 pt-3 sm:grid-cols-2 dark:border-white/10">
                <Link
                  href="/signin"
                  onClick={closeMenus}
                  className="flex min-h-11 items-center justify-center rounded-xl border border-black/10 px-4 py-3 text-sm font-bold text-[#173f35] transition hover:bg-black/5 dark:border-white/15 dark:text-white dark:hover:bg-white/10"
                >
                  Sign in
                </Link>

                <Link
                  href="/signup"
                  onClick={closeMenus}
                  className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#174d3b] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#23674f]"
                >
                  Get involved
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            )}

            {!isPending && user && (
              <div className="mt-3 border-t border-black/10 pt-3 dark:border-white/10">
                <div className="mb-2 rounded-xl bg-black/[0.03] px-3 py-3 dark:bg-white/[0.04]">
                  <p className="truncate text-sm font-bold">
                    {user.name || "Community member"}
                  </p>
                  <p className="truncate text-xs text-gray-500">{user.email}</p>
                </div>

                {profileLinks.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeMenus}
                    className={`${linkClass} flex min-h-11 items-center gap-3`}
                  >
                    <Icon size={18} />
                    {label}
                  </Link>
                ))}

                <button
                  type="button"
                  disabled={loggingOut}
                  onClick={handleLogout}
                  className="mt-1 flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold text-rose-600 transition hover:bg-rose-50 disabled:opacity-60 dark:hover:bg-rose-950/30"
                >
                  <LogOut size={18} />
                  {loggingOut ? "Signing out..." : "Sign out"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
