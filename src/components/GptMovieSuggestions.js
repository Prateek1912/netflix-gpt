import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';
import lang from '../utils/languageConstants';

export const GptMovieSuggestions = () => {
  const langKey = useSelector(store => store.config.lang);
  const { searchedMovies, movieName } = useSelector((store) => store.gpt);
  if (!movieName) return null;
  console.log(searchedMovies);
  if (!searchedMovies.length) {
    return (
      <h1 className="p-2 m-4 mt-16 bg-black text-white bg-opacity-90">{lang[langKey].errorMessage}</h1>
    );
  }

    return (
      <div className="p-2 m-4 mt-16 bg-black text-white bg-opacity-90">
        <div>
          <MovieList title={movieName} movies={searchedMovies}></MovieList>
        </div>
      </div>
    );
}
