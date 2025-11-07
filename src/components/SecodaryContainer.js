import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  if (!movies) return null;

  return (
    <div className=" bg-black -mt-20 md:-mt-40 pb-20">
      <div className="-mt-52 pl-12 relative z-10">
      <MovieList title="Now Playing" movies={movies.nowPlayingMovies} />
      <MovieList title="Top Movies on Netflix" movies={movies.topRatedMovies} />
      <MovieList title="New on Netflix" movies={movies.upComingMovies} />
      <MovieList title="Popular" movies={movies.popularMovies} />
      </div>



    </div>
  );
};

export default SecondaryContainer;
