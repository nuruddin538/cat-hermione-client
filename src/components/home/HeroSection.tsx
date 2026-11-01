import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="overflow-hidden bg-[#f8f7f1] px-5 py-16 dark:bg-[#101b17] sm:px-8 sm:py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#dce5d8] bg-white px-4 py-2 text-sm font-medium text-[#285b43] dark:border-white/10 dark:bg-white/5 dark:text-[#b9e6c8]">
            <span className="h-2 w-2 rounded-full bg-[#ed795f]" />
            Small acts. Lasting impact.
          </div>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-[#173f35] dark:text-white sm:text-5xl lg:text-7xl">
            Make your community
            <span className="font-serif italic font-medium text-[#ed795f]">
              {" "}
              a better place.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-[#68776c] dark:text-gray-300 sm:text-lg">
            Discover meaningful community events, meet people who care, and turn
            small acts of kindness into lasting change.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/events"
              className="rounded-full bg-[#173f35] px-7 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#285b43] dark:bg-[#b9e6c8] dark:text-[#173f35]"
            >
              Explore events <span aria-hidden="true">↗</span>
            </Link>
            <Link
              href="/create-event"
              className="rounded-full border border-[#d7dfd4] bg-white px-7 py-3.5 font-semibold text-[#173f35] transition hover:border-[#ed795f] hover:text-[#d65f47] dark:border-white/20 dark:bg-white/5 dark:text-white"
            >
              Start an initiative +
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              {[
                "photo-1534528741775-53994a69daeb",
                "photo-1500648767791-00dcc994a43e",
                "photo-1531123897727-8f129e1688ce",
              ].map((photo) => (
                <img
                  key={photo}
                  src={`https://images.unsplash.com/${photo}?auto=format&fit=crop&w=80&h=80&q=80`}
                  alt="Community volunteer"
                  className="h-10 w-10 rounded-full border-2 border-[#f8f7f1] object-cover dark:border-[#101b17]"
                />
              ))}
            </div>
            <p className="text-sm text-[#68776c] dark:text-gray-300">
              <span>Good people</span>
              Real community impact.
            </p>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -right-4 -top-5 h-28 w-28 rounded-full bg-[#ed795f]/20 blur-2xl" />
          <div className="absolute -bottom-6 -left-5 h-32 w-32 rounded-full bg-[#a6c6a5]/50 blur-2xl" />

          <div className="relative overflow-hidden rounded-[2rem] rounded-bl-[6rem] border-[8px] border-white shadow-2xl dark:border-[#23352c]">
            <img
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1100&q=85"
              alt="Volunteers working together for their community"
              className="h-[360px] w-full object-cover sm:h-[480px]"
            />
          </div>
          <div className="absolute -bottom-5 left-3 max-w-[260px] rounded-2xl bg-white p-4 shadow-xl dark:bg-[#20352b] sm:-left-8 sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ed795f]">
              Your next good deed
            </p>
            <p className="mt-2 font-semibold text-[#173f35] dark:text-white">
              One afternoon can make a difference.
            </p>
          </div>
          <div className="absolute right-3 top-5 rounded-2xl bg-[#173f35] px-4 py-3 text-white shadow-lg sm:right-5">
            <p className="text-xs text-white/70">Powerd by</p>
            <p className="font-semibold">People like you ✳</p>
          </div>
        </div>
      </div>
    </section>
  );
}
