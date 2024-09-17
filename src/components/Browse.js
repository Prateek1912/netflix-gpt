import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainConatiner from "./mainConatiner";
import SecondaryContainer from "./secondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";


const Browse = () => {
    useNowPlayingMovies();
    usePopularMovies();
    useUpcomingMovies();
    useTopRatedMovies();
    
    return (
        <div>
            <Header></Header>
            <MainConatiner />
            <SecondaryContainer />
        </div>
    )
}

export default Browse;
