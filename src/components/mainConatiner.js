import React from 'react'
import VideoTitle from './VideoTitle'
import VideoBackground from './VideoBackground'
import { useSelector } from 'react-redux'

const MainConatiner = () => {
  
  const movies = useSelector(store => store.movies?.nowPlayingMovies);
    
  if (!movies) return;

  const mainMovie = movies[0];
  
  const { title, overview, id } = mainMovie;


    return (
      <div>
          <VideoTitle title={title} overview={overview} />
        <VideoBackground movie_id={id} />
    </div>
  )
}

export default MainConatiner