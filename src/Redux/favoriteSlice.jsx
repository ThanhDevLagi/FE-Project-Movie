import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://be-project-movie.onrender.com/api";

export const addFavoriteMovie = createAsyncThunk(
    "favorite/addFavoriteMovie",
    async ({ userId, movie }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/addFavoriteMovie`, { userId, movie });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteFavoriteMovie = createAsyncThunk(
    "favorite/deleteFavoriteMovie",
    async ({ userId, movieId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/removeFavoriteMovie`, { userId, movieId });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchFavoriteMovies = createAsyncThunk(
    "favorite/fetchFavoriteMovies",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/favoriteMovies/${userId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const favoriteSlice = createSlice({
    name: "favorite",
    initialState: {
        items: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addFavoriteMovie.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addFavoriteMovie.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload.favoriteMovies;
            })
            .addCase(addFavoriteMovie.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload.message || action.error.message;
            })
            .addCase(deleteFavoriteMovie.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteFavoriteMovie.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload.favoriteMovies; // cập nhật mảng bên backend
            })
            .addCase(deleteFavoriteMovie.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload.message || action.error.message;
            })
            .addCase(fetchFavoriteMovies.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchFavoriteMovies.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload.favoriteMovies;
            })
            .addCase(fetchFavoriteMovies.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload.message || action.error.message;
            });
    },
});

export default favoriteSlice.reducer;
