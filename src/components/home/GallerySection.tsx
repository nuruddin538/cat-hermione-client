const galleryImages = [
  {
    src: "photo-1559027615-cd4628902d4a",
    title: "Stronger together",
    category: "Community",
    className: "md:row-span-2",
  },
  {
    src: "photo-1472396961693-142e6e269027",
    title: "Protect our planet",
    category: "Nature",
    className: "",
  },
  {
    src: "photo-1469571486292-0ba58a3f068b",
    title: "A helping hand",
    category: "Volunteering",
    className: "",
  },
  {
    src: "photo-1511632765486-a01980e01a18",
    title: "Together we grow",
    category: "People",
    className: "",
  },
  {
    src: "photo-1542601906990-b4d3fb778b09",
    title: "A greener tomorrow",
    category: "Environment",
    className: "",
  },
];

export default function GallerySection() {
  return (
    <section className="bg-white px-5 py-20 dark:bg-[#14221b] sm:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#ed795f]">
            Moments that matter
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#173f35] dark:text-white sm:text-4xl">
            Little actions. Beautiful stories.
          </h2>
          <p className="mt-3 leading-7 text-[#718075] dark:text-gray-300">
            Every cleanup, every shared meal, and every planted tree is a
            reminder of what people can achieve together.
          </p>
        </div>
        <div className="grid auto-rows-[220px] gap-4 sm:grid-cols-2 md:grid-cols-3">
          {galleryImages.map((item, index) => (
            <article
              key={item.src}
              className={`group relative overflow-hidden rounded-3xl ${item.className}`}
            >
              <img
                src={`https://images.unsplash.com/${item.src}?auto=format&fit=crop&w=900&q=80`}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10291f]/90 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f8b6a5]">
                  {item.category}
                </p>
                <h3 className="mt-2 text-xl font-bold text-white">
                  {item.category}
                </h3>
              </div>
              {index === 0 && (
                <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#173f35]">
                  Community highlights
                </span>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
