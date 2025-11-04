import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="text-white px-12 md:px-20 w-full md:w-[60%] pt=[30vh]">
      <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-xl">
        {title}
      </h1>
      <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8">
        {overview?.length > 250 ? overview.slice(0, 250) + "..." : overview}
      </p>
      <div className="flex gap-4">
        <button className="bg-white text-black font-semibold px-8 py-3 rounded-md hover:bg-gray-300 transition-all duration-300">
          ▶ Play
        </button>
        <button className="bg-gray-500/70 text-white font-semibold px-8 py-3 rounded-md hover:bg-gray-400/60 transition-all duration-300">
          ℹ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
