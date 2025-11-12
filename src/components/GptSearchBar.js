import React, { useRef } from "react";
import lang from "../utils/languageConstant";
import { useDispatch, useSelector } from "react-redux";
import gemini from "../utils/geminiai";
import { API_OPTIONS } from "../utils/constant";
import { addGptMoviesResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);


  const searchMoviesTmdb = async (movie) => {
    const res = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        encodeURIComponent(movie) + // Important for spaces & symbols
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await res.json();
    return json?.results || [];
  };

  const handleGptSearchClick = async () => {
    const userInput = (searchText.current?.value || "").trim();
    if (!userInput) return;

    const gptQuery =
      "Act as a movie recommendation system and suggest some movies for the query: " +
      userInput +
      ". Only give me the names of 5 movies, comma-separated like this example: Gadar, Sholay, Don, De Dana Dan, Koi Mil Gaya";

    try {

      const response = await gemini.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [{ role: "user", parts: [{ text: gptQuery }] }],
      });


      const text =
        typeof response.text === "function" ? response.text() : (response.text || "");

      console.log("🎬 Gemini Movie Recommendations:", text);

      const moviesName = text
        .split(/[,|\n]/)
        .map((s) => s.replace(/^[\s\-•\d.]+/, "").trim())
        .filter(Boolean)
        .slice(0, 5);

      console.log("✅ Parsed Movie Names:", moviesName);

      const moviesResults = await Promise.all(
        moviesName.map((m) => searchMoviesTmdb(m))
      );

      console.log("🎞️ TMDB Search Results:", moviesResults);

  
      dispatch(addGptMoviesResult({ moviesName, moviesResults }));
    } catch (error) {
      console.error("Gemini error:", error);
    }
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9 rounded"
          placeholder={lang[langKey].getSearchPlaceholder}
        />
        <button
          type="button"
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
