import React from "react";
import { IMG_CDN_URL } from "../utils/constant";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;

  return (
    <div className="min-w-[100px] md:min-w-[150px] lg:min-w-[180px] transition-transform duration-300 hover:scale-110 cursor-pointer">
      <img
        className="rounded-md shadow-md hover:shadow-xl w-full aspect-[2/3] object-cover"
        alt="Movie Poster"
        src={IMG_CDN_URL + posterPath}
      />
    </div>
  );
};

export default MovieCard;
