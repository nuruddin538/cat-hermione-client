import Link from "next/link";
import {
  HeartHandshake,
  Heart,
  ArrowUpRight,
  Github,
  Facebook,
  Instagram,
  Mail,
  MapPin,
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Upcoming Events", href: "/upcoming-events" },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: Github,
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: Facebook,
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: Instagram,
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#102C25] text-white">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-32 -top-40 size-[440px] rounded-full border border-white/10" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-emerald-600">
                <HeartHandshake className="size-6" />
              </span>

              <span className="text-3xl font-extrabold">
                kindora
                <span className="text-amber-400">.</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
              Kindora connects compassionate people with meaningful social
              service opportunities. Together, we can create stronger
              communities and lasting positive change.
            </p>

            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:bg-emerald-600 hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-6 font-semibold text-emerald-200">Quick Links</h3>

            <ul className="space-y-4">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/65 transition hover:text-amber-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 font-semibold text-emerald-200">Contact</h3>

            <div className="space-y-5 text-sm text-white/65">
              <p className="flex items-center gap-3">
                <MapPin className="size-4 text-emerald-300" />
                Bangladesh
              </p>

              <a
                href="mailto:hello@kindora.example"
                className="flex items-center gap-3 hover:text-amber-300"
              >
                <Mail className="size-4 text-emerald-300" />
                hello@kindora.example
              </a>
            </div>

            <Link
              href="/upcoming-events"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-amber-300 hover:text-amber-200"
            >
              Explore Events
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-7 text-center text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Kindora. All rights reserved.</p>

          <p className="flex items-center gap-1.5">
            Made with
            <Heart className="size-3.5 fill-amber-400 text-amber-400" />
            for a better tomorrow.
          </p>
        </div>
      </div>
    </footer>
  );
}
