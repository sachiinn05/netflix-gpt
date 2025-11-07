import React from 'react'
import Header from './Header'
import  useNowPlayingMovies  from "../hooks/useNowPlayingMovies"
import MainContainer from './MainContainer';
import SecodaryContainer from './SecodaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpComingMovies from '../hooks/useUpComingMovies';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';

const Browse = () => {
  const showGptSearch=useSelector((store)=>store.gpt.showGptSearch)
   useNowPlayingMovies();
   usePopularMovies();
   useTopRatedMovies();
   useUpComingMovies();
   

  return (
    <div>
      <Header/>
      {
        showGptSearch ? (<GptSearch/>
        ):(
        <>
          <MainContainer/>
          <SecodaryContainer/>
        </>
      )}
     
     
      </div>
  )
}

export default Browse