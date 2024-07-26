import { combineReducers } from "@reduxjs/toolkit";
import favoriteSlice from "./favoriteSlice";

// Import other reducers

const rootReducer = combineReducers({
    favorite: favoriteSlice,
    // Other reducers
});

export default rootReducer;
