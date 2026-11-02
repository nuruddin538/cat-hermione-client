export default function NewsletterSection() {
  return (
    <section className="bg-[#f8f7f1] px-5 py-16 dark:bg-[#101b17] sm:px-8 lg:py-20">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#173f35] px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border-[40px] border-white/[0.06]" />
        <div className="pointer-events-none absolute -bottom-24 right-40 h-56 w-56 rounded-full bg-[#ed795f]/20 blur-3xl" />

        <div className="relative grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#f8b6a5]">
              A little good in your inbox
            </p>

            <h2 className="mt-4 max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Stay close to the change you want to see.
            </h2>

            <p className="mt-4 max-w-lg leading-7 text-white/70">
              Discover inspiring community stories, upcoming initiatives, and
              simple ways to make a difference.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-5 sm:p-7">
            <label
              htmlFor="newsletter-email"
              className="mb-3 block text-sm font-semibold text-white"
            >
              Your email address
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="newsletter-email"
                type="email"
                placeholder="you@example.com"
                className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/10 px-5 py-3.5 text-white outline-none placeholder:text-white/45 focus:border-[#f8b6a5]"
              />

              <button
                type="button"
                className="rounded-full bg-[#ed795f] px-6 py-3.5 font-bold text-white transition hover:bg-[#db684f]"
              >
                Keep me posted ↗
              </button>
            </div>

            <p className="mt-4 text-xs leading-5 text-white/55">
              Just good news and good ideas. No spam.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
