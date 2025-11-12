import React, { useRef } from "react";
import { useSelector } from "react-redux";

const IMG = "https://image.tmdb.org/t/p/";

const GptMoviesSuggestion = () => {
  const { moviesName, moviesResults } = useSelector((s) => s.gpt);

  // ✅ If no valid data, render nothing (no empty black strip)
  if (!Array.isArray(moviesName) || !Array.isArray(moviesResults)) return null;

  // Filter out empty result sets
  const rows = moviesName
    .map((name, idx) => ({ title: name, items: moviesResults[idx] || [] }))
    .filter((r) => Array.isArray(r.items) && r.items.length > 0);

  if (rows.length === 0) return null;

  return (
    // ✅ Black background only when movies exist
    <section className="relative bg-black  bg-opacity-70">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-10 text-white">
        {rows.map((r, i) => (
          <Row key={`${r.title}-${i}`} title={r.title} items={r.items} />
        ))}
      </div>
    </section>
  );
};

/* ────────────────────────────── Row Section ────────────────────────────── */
const Row = ({ title, items }) => {
  const ref = useRef(null);

  const scrollBy = (dir) => {
    const el = ref.current;
    if (!el) return;
    const amount = Math.min(900, el.clientWidth * 0.9);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div className="relative mb-10">
      {/* Title */}
      <div className="sticky top-0 z-10 -mt-1 mb-3">
        <h2
          className="inline-flex items-center gap-2 text-xl md:text-2xl font-semibold tracking-wide
          bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70"
        >
          <span
            className="inline-flex h-6 w-6 items-center justify-center rounded-md
            bg-white/10 text-white/90 text-xs font-bold"
          >
            {title?.[0]?.toUpperCase() || "•"}
          </span>
          {title}
        </h2>
      </div>

      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-8 left-0 w-16 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-8 right-0 w-16 bg-gradient-to-l from-black to-transparent" />

      {/* Arrows + Scroller */}
      <div className="group relative">
        <button
          onClick={() => scrollBy(-1)}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 h-10 w-10
                     items-center justify-center rounded-full bg-white/10 backdrop-blur-sm
                     hover:bg-white/20 ring-1 ring-white/10 transition opacity-0 group-hover:opacity-100"
          aria-label="Scroll left"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => scrollBy(1)}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 h-10 w-10
                     items-center justify-center rounded-full bg-white/10 backdrop-blur-sm
                     hover:bg-white/20 ring-1 ring-white/10 transition opacity-0 group-hover:opacity-100"
          aria-label="Scroll right"
        >
          <ChevronRight />
        </button>

        <div
          ref={ref}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory
                     scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent
                     px-1 py-2 rounded-xl bg-white/[0.04] ring-1 ring-white/[0.05] backdrop-blur-sm"
        >
          {items.map((m) => (
            <div key={m.id} className="snap-start first:ml-1 last:mr-1">
              <MovieCard movie={m} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ────────────────────────────── Movie Card ────────────────────────────── */
const MovieCard = ({ movie }) => {
  const poster = movie?.poster_path
    ? IMG + "w342" + movie.poster_path
    : movie?.backdrop_path
    ? IMG + "w342" + movie.backdrop_path
    : null;

  if (!poster) return null;

  const title = movie?.title || movie?.name || "Untitled";
  const year = (movie?.release_date || movie?.first_air_date || "").slice(0, 4);
  const rating = typeof movie?.vote_average === "number" ? movie.vote_average : null;

  return (
    <figure
      className="relative w-[150px] md:w-[180px] shrink-0 rounded-xl overflow-hidden
                 ring-1 ring-white/10 bg-white/5 transition-all
                 hover:bg-white/[0.1] hover:scale-[1.05]
                 hover:shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
      title={title}
    >
      <img
        src={poster}
        alt={title}
        className="h-[220px] md:h-[260px] w-full object-cover"
        loading="lazy"
      />

      <figcaption className="absolute inset-x-0 bottom-0 p-2
                             bg-gradient-to-t from-black/80 via-black/30 to-transparent">
        <p className="text-[11px] md:text-sm font-medium line-clamp-1">{title}</p>
        <div className="mt-1 flex items-center gap-2 text-[10px] text-white/80">
          {year && (
            <span className="px-1.5 py-0.5 rounded bg-white/10 ring-1 ring-white/10">
              {year}
            </span>
          )}
          {rating && rating > 0 && (
            <span className="px-1.5 py-0.5 rounded bg-white/10 ring-1 ring-white/10">
              ★ {rating.toFixed(1)}
            </span>
          )}
        </div>
      </figcaption>
    </figure>
  );
};

/* ────────────────────────────── Icons ────────────────────────────── */
const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M15 19l-7-7 7-7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M9 5l7 7-7 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default GptMoviesSuggestion;
