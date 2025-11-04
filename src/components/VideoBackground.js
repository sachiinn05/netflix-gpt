import React from "react";
import { useSelector } from "react-redux";
import useMoviesTrailer from "../hooks/useMoviesTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  useMoviesTrailer(movieId);

  if (!trailerVideo) return null;

  return (
    <div className="absolute inset-0 w-screen h-screen overflow-hidden z-0">
      {/* 🎥 Background Video */}
      <iframe
        className="w-[100vw] h-[56.25vw] min-h-full min-w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.4]"
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerVideo?.key}`}
        style={{ pointerEvents: "none", zIndex: 0 }}
        title="Movie Trailer"
        allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>

      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>
    </div>
  );
};

export default VideoBackground;
