import React from 'react'
import Header from './Header'
import VideoBackground from './VideoBackground'
import { useLocation } from 'react-router-dom';
import VideoTitle from './VideoTitle';

const MovieDetails = () => {
  const location = useLocation();
  const { details } = location.state || {};
  const { title, overview, id } = details;
  return (
    <div>
      <Header forPath={"movie"} />
      <VideoTitle title={title} overview={overview} />
      <VideoBackground movie_id={id} />
    </div>
  );
}

export default MovieDetails