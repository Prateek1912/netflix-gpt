import React from 'react'
import { GptSearchBar } from './GptSearchBar'
import { GptMovieSuggestions } from './GptMovieSuggestions'
import Header from './Header';

const GptSearch = () => {
  return (
    <div>
      <Header forPath={"movie"}/>
      <div className="fixed -z-10">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/20bf1f4d-1c73-48fd-8689-310d6dd80efc/81bdc063-cb8f-4afe-8a02-a3131ca4ef5e/IN-en-20240812-POP_SIGNUP_TWO_WEEKS-perspective_WEB_7998f3b6-63e3-424a-8328-550cf777ddce_large.jpg"></img>
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
}

export default GptSearch