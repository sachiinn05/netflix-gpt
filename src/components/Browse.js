import React from 'react'
import Header from './Header'
import  useNowPlayingMovies  from "../hooks/useNowPlayingMovies"
import MainContainer from './MainContainer';
import SecodaryContainer from './SecodaryContainer';

const Browse = () => {
   useNowPlayingMovies();

  return (
    <div>
      <Header/>
      <MainContainer/>
      <SecodaryContainer/>
      </div>
  )
}

export default Browse