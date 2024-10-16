import React, { useRef } from 'react'
import lang from "../utils/languageConstants"
import { useDispatch, useSelector } from 'react-redux'
import { API_OPTIONS } from '../utils/constants';
import { addSearchedMovies } from '../utils/gptSlice';

export const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector(store => store.config.lang);
  const searchText = useRef(null);

  const searchTMDBMovie = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" + movie + "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    console.log(json.results);
    return json.results;
  }

  const handleGptSearchClick = async () => {
    const tmdbResults = await searchTMDBMovie(searchText.current.value);
    console.log(tmdbResults);
    dispatch(addSearchedMovies({ movies: tmdbResults, movieName: searchText.current.value })); 
  }

  return (
      <div className='pt-[10%] flex justify-center'>
          <form className='w-1/2 bg-black grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
        <input ref={searchText} type='text' placeholder={lang[langKey].gptSearchPlaceholder} className='p-4 m-4 col-span-9'></input>
              <button onClick={handleGptSearchClick} className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg'>{lang[langKey].search}</button>
          </form>
       </div>
  )
}
