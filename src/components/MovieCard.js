import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'
import { Link, useNavigate } from 'react-router-dom'
import MovieDetails from './MovieDetails';

const MovieCard = ({ posterPath, movieDetails }) => {
  const navigate = useNavigate();

  if (!posterPath) return null;

  const onMovieClick = () => {
    navigate("/movie", { state: { details: movieDetails } });
  }

  return (
    <div className="w-36 pr-4">
      {/* <Link to={"/movie"}>
        <img alt="movie card" src={IMG_CDN_URL + posterPath}></img>
      </Link> */}
      <img onClick={onMovieClick} className="cursor-pointer" alt="movie card" src={IMG_CDN_URL + posterPath}></img>
    </div>
  );
}

export default MovieCard