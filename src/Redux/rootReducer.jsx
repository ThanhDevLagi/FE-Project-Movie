import { combineReducers } from "@reduxjs/toolkit";
import favoriteSlice from "./favoriteSlice";
import commentSlice from "./commentSlice";
import moviesSlice from "./moviesSlice";


const rootReducer = combineReducers({
    favorite: favoriteSlice,
    comments: commentSlice,
    movies: moviesSlice
    // Other reducers
});

export default rootReducer;
