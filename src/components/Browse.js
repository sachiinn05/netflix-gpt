import React from 'react'
import Header from './Header'
import  useNowPlayingMovies  from "../hooks/useNowPlayingMovies"
import MainContainer from './MainContainer';
import SecodaryContainer from './SecodaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpComingMovies from '../hooks/useUpComingMovies';

const Browse = () => {
   useNowPlayingMovies();
   usePopularMovies();
   useTopRatedMovies();
   useUpComingMovies();
   

  return (
    <div>
      <Header/>
      <MainContainer/>
      <SecodaryContainer/>
      </div>
  )
}

export default Browse