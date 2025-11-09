import React, { useRef } from "react";
import lang from "../utils/languageConstant";
import { useSelector } from "react-redux";
import gemini from "../utils/geminiai";
import { API_OPTIONS } from "../utils/constant";

const GptSearchBar = () => {
  const searchText = useRef(null);
  const langKey = useSelector((store) => store.config.lang);

  const searchMoviesTmdb=async(movie)=>{
       const data=await fetch("https://api.themoviedb.org/3/search/movie?query=" + movie+"&include_adult=false&language=en-US&page=1", 
        API_OPTIONS);
        const json= await data.json();
        
        return json.results;
  }

  const handleGptSearchClick = async () => {
    const userInput = searchText.current.value.trim();
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


      const text = response.text || "";

      console.log("🎬 Gemini Movie Recommendations:", text);

      const moviesList = text
        .split(/[,|\n]/)
        .map((m) => m.trim())
        .filter(Boolean)
        .slice(0, 5);

      console.log("✅ Parsed Movies:", moviesList);
      
      const data= moviesList.map((movie)=>searchMoviesTmdb(movie))
      //imp line due to above line  , above line take some time to fetch data so  it is async and await it return array of promise show we used Promise.All() fxn....

      const tmdbResults=await Promise.all(data)
      console.log(tmdbResults);
      

      

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
          className="p-4 m-4 col-span-9"
          placeholder={lang[langKey].getSearchPlaceholder}
        />
        <button
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
