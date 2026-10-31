"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeartHandshake, ArrowUpRight } from "lucide-react";

// import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";

import UserDropdown from "./UserDropdown";
// import MobileNavbar from "./MobileNavbar";

export default function Navbar() {
  const pathname = usePathname();

  //   const { data: session, isPending } = authClient.useSession();

  //   const user = session?.user;

  return (
    <TooltipProvider>
      <header className="sticky top-0 z-50 w-full border-b border-emerald-900/10 bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-700 text-white transition-transform duration-300 group-hover:-rotate-6">
              <HeartHandshake className="size-6" />
            </div>

            <span className="text-2xl font-extrabold tracking-tight text-emerald-800 dark:text-emerald-400">
              kindora
              <span className="text-amber-500">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className={`text-sm font-semibold transition-colors ${
                pathname === "/"
                  ? "text-emerald-700 dark:text-emerald-400"
                  : "text-muted-foreground hover:text-emerald-600"
              }`}
            >
              Home
            </Link>

            <Link
              href="/upcoming-events"
              className={`text-sm font-semibold transition-colors ${
                pathname.startsWith("/upcoming-events")
                  ? "text-emerald-700 dark:text-emerald-400"
                  : "text-muted-foreground hover:text-emerald-600"
              }`}
            >
              Upcoming Events
            </Link>
          </nav>

          {/* Desktop Authentication */}
          <div className="hidden items-center gap-4 md:flex">
            {isPending ? (
              <div className="h-10 w-28 animate-pulse rounded-full bg-muted" />
            ) : user ? (
              <UserDropdown
                user={{
                  name: user.name,
                  email: user.email,
                  image: user.image,
                }}
              />
            ) : (
              <Button
                asChild
                className="rounded-full bg-emerald-700 px-6 text-white hover:bg-emerald-800"
              >
                <Link href="/login">
                  Login
                  <ArrowUpRight className="ml-1 size-4" />
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            {/* {isPending ? (
              <div className="size-10 animate-pulse rounded-xl bg-muted" />
            ) : (
              <MobileNavbar isLoggedIn={Boolean(user)} userName={user?.name} />
            )} */}
          </div>
        </div>
      </header>
    </TooltipProvider>
  );
}
