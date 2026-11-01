import Link from "next/link";
import { ArrowUpRight, HeartHandshake, Sparkles } from "lucide-react";

type AuthBrandPanelProps = {
  mode: "signin" | "signup";
};

export default function AuthBrandPanel({ mode }: AuthBrandPanelProps) {
  const isSignup = mode === "signup";

  return (
    <aside className="relative hidden min-h-[650px] overflow-hidden rounded-[2rem] bg-[#173f35] p-10 text-white lg:flex lg:flex-col lg:justify-between">
      <div className="pointer-events-none absolute -right-24 top-20 size-80 rounded-full border border-white/10" />
      <div className="pointer-events-none absolute -right-12 top-32 size-56 rounded-full border border-white/10" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 size-80 rounded-full bg-[#f17a61]/15 blur-3xl" />

      <Link href="/" className="relative z-10 flex items-center gap-3">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-white/10">
          <HeartHandshake size={26} />
        </span>
        <span className="text-2xl font-black tracking-tight">
          impactora<span className="text-[#f17a61]">.</span>
        </span>
      </Link>

      <div className="relative z-10 my-12">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-100">
          <Sparkles size={14} />
          People-powered change
        </span>

        <h2 className="max-w-lg text-5xl font-black leading-[1.08] tracking-tight xl:text-6xl">
          {isSignup ? (
            <>
              Your next
              <br />
              good thing
              <br />
              <span className="font-serif italic font-normal text-[#f7a28f]">
                starts here.
              </span>
            </>
          ) : (
            <>
              The world
              <br />
              changes when
              <br />
              <span className="font-serif italic font-normal text-[#f7a28f]">
                we show up.
              </span>
            </>
          )}
        </h2>

        <p className="mt-6 max-w-sm text-base leading-7 text-white/70">
          Find your people, support a cause, and turn small acts of kindness
          into meaningful community impact.
        </p>
      </div>

      <div className="relative z-10 rounded-2xl border border-white/15 bg-white/[0.07] p-5 backdrop-blur-sm">
        <div className="mb-3 flex -space-x-2">
          {["A", "R", "S", "N"].map((letter, index) => (
            <span
              key={letter}
              className={`flex size-9 items-center justify-center rounded-full border-2 border-[#173f35] text-xs font-black text-[#173f35] ${
                [
                  "bg-[#f7c9a8]",
                  "bg-[#d6e8c8]",
                  "bg-[#f7a28f]",
                  "bg-[#f1e8d9]",
                ][index]
              }`}
            >
              {letter}
            </span>
          ))}
          <span className="flex size-9 items-center justify-center rounded-full border-2 border-[#173f35] bg-white text-xs font-bold text-[#173f35]">
            +
          </span>
        </div>

        <p className="font-bold">Good things happen together.</p>
        <p className="mt-1 text-sm text-white/60">
          One community. Countless possibilities.
        </p>

        <Link
          href="/upcoming-events"
          className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#f7a28f] hover:text-white"
        >
          Explore opportunities
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </aside>
  );
}
