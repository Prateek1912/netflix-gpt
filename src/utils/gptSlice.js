import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gpt",
    initialState: {
        showGptSearch: false,
        searchedMovies: null,
        movieName: null,
    },
    reducers: {
        toggleGptSearchView(state) {
            state.showGptSearch = !state.showGptSearch;
        },
        addSearchedMovies(state, action) {
            const { movies, movieName } = action.payload;
            state.searchedMovies = movies;
            state.movieName = movieName;
        },
        clearSearchedMovies(state) {
            state.searchedMovies = null;
            state.movieName = null;
        }

    }
})

export default gptSlice.reducer;
export const { toggleGptSearchView,addSearchedMovies,clearSearchedMovies} = gptSlice.actions;