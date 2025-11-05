import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="text-white px-6 mb-8 py-3">
      <h2 className="text-lg md:text-2xl font-semibold mb-3">{title}</h2>
      <div className="flex overflow-x-scroll scrollbar-hide space-x-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} posterPath={movie.poster_path} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
