const features = [
  {
    number: "01",
    icon: "🌱",
    title: "Find your cause",
    description:
      "Discover cleanups, plantation drives, donation campaigns, and other local initiatives.",
    color: "bg-[#e5f0df]",
  },
  {
    number: "02",
    icon: "🤝",
    title: "Meet your people",
    description:
      "Connect with people who share your passion for making a positive difference.",
    color: "bg-[#fbe6de]",
  },
  {
    number: "03",
    icon: "✳",
    title: "Create real impact",
    description:
      "Start an event, bring your community together, and turn an idea into action.",
    color: "bg-[#f3edcf]",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-white px-5 py-20 dark:bg-[#14221b] sm:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#ed795f]">
              Why Impactora
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-[#173f35] dark:text-white sm:text-4xl">
              Good intentions deserve
              <span className="font-serif italic font-medium"> action.</span>
            </h2>
          </div>
          <p className="max-w-md leading-7 text-[#718075] dark:text-gray-300">
            We make it easier to find opportunities, bring people together, and
            do something meaningful for the world around us.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.number}
              className="group rounded-3xl border border-[#e8ebe4] bg-[#fbfaf6] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#b7cbb7] hover:shadow-xl dark:border-white/10 dark:bg-white/[0.03]"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${feature.color}`}
                >
                  {feature.icon}
                </div>
                <span className="text-sm font-semibold text-[#a0aca0]">
                  {feature.number}
                </span>
              </div>
              <h3 className="mt-7 text-xl font-bold text-[#173f35] dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-3 leading-7 text-[#718075] dark:text-gray-300">
                {feature.description}
              </p>
              <div className="mt-7 h-1 w-12 rounded-full bg-[#ed795f] transition-all duration-300 group-hover:w-20" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
