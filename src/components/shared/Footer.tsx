import Link from "next/link";
import { ArrowUpRight, HeartHandshake, Mail } from "lucide-react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#173f35] px-5 pb-6 pt-16 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-white/15 pb-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-white/10">
                <HeartHandshake size={25} />
              </span>
              <span className="text-2xl font-black tracking-tight">
                impactora<span className="text-[#f17a61]">.</span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-white/65">
              Bringing people together to create a kinder, greener, and more
              connected world.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex size-10 items-center justify-center rounded-full border border-white/20 transition hover:border-[#f17a61] hover:bg-[#f17a61]"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex size-10 items-center justify-center rounded-full border border-white/20 transition hover:border-[#f17a61] hover:bg-[#f17a61]"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="mailto:hello@example.com"
                aria-label="Email us"
                className="flex size-10 items-center justify-center rounded-full border border-white/20 transition hover:border-[#f17a61] hover:bg-[#f17a61]"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Explore</h3>
            <ul className="mt-5 space-y-4 text-sm text-white/65">
              <li>
                <Link className="transition hover:text-white" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="transition hover:text-white"
                  href="/upcoming-events"
                >
                  Upcoming events
                </Link>
              </li>
              <li>
                <Link
                  className="transition hover:text-white"
                  href="/#our-mission"
                >
                  Our mission
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold">Get involved</h3>
            <ul className="mt-5 space-y-4 text-sm text-white/65">
              <li>
                <Link className="transition hover:text-white" href="/signup">
                  Join the community
                </Link>
              </li>
              <li>
                <Link
                  className="transition hover:text-white"
                  href="/dashboard/create-event"
                >
                  Create an event
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white" href="/signin">
                  Sign in
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#f7a28f]">
              <span className="size-2 rounded-full bg-[#f7a28f]" />
              Make a difference
            </span>

            <h3 className="mt-4 text-2xl font-black leading-tight">
              One small act
              <br />
              can start a movement.
            </h3>

            <Link
              href="/upcoming-events"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#f17a61] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#e9664a]"
            >
              Find your next event
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Impactora. Built for positive change.
          </p>
          <p>Made with care for the community.</p>
        </div>
      </div>
    </footer>
  );
}
