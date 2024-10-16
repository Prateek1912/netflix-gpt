import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainConatiner from "./mainConatiner";
import SecondaryContainer from "./secondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";


const Browse = () => {
    const showGptSearch = useSelector(store => store.gpt.showGptSearch);
    useNowPlayingMovies();
    usePopularMovies();
    useUpcomingMovies();
    useTopRatedMovies();

    return (
      <div>
        <Header></Header>
        {showGptSearch ? (
          <GptSearch />
        ) : (
          <>
            <MainConatiner />
            <SecondaryContainer />
          </>
        )}
      </div>
    );
}

export default Browse;
