import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMoviesSuggestion from './GptMoviesSuggestion'
import { BackgroundImg } from '../utils/constant'

const GptSearch = () => {
  return (
    <div>
       <div className="absolute inset-0 w-screen h-screen -z-10">
        <img
          src={BackgroundImg}
          alt="logo"
          className="w-full h-full object-cover"
         />
       </div>

        <GptSearchBar/>
        <GptMoviesSuggestion/>
    </div>
  )
}

export default GptSearch