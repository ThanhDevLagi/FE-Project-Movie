import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'https://be-project-movie.onrender.com/api';
// const API_BASE_URL = 'http://localhost:5000/api';

export const getMovies = createAsyncThunk("movies/getMovies", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/movies`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const addMovie = createAsyncThunk('movies/addMovie', async (movieData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/movies`, movieData);
        return response.data.movie || [];
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const getMovieDetail = createAsyncThunk("movies/getMovie", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/movie/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateMovie = createAsyncThunk("movies/updateMovie", async ({ id, body }, { rejectWithValue }) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/movie/${id}`, body);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const deleteMovie = createAsyncThunk("movies/deleteMovie", async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${API_BASE_URL}/movie/${id}`);
        return id;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: [],
        selectedMovie: null,
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addMovie.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addMovie.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.movies.push(action.payload);
            })
            .addCase(addMovie.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getMovies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getMovies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.movies = action.payload.map(movie => ({
                    ...movie,
                    categories: movie.categories || {}
                }));
            })
            .addCase(getMovies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getMovieDetail.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getMovieDetail.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedMovie = action.payload;
            })
            .addCase(getMovieDetail.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateMovie.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateMovie.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.movies = state.movies.map(movie =>
                    movie._id === action.payload._id ? action.payload : movie
                );
                state.selectedMovie = action.payload; 
            })
            .addCase(updateMovie.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteMovie.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteMovie.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.movies = state.movies.filter(movie => movie._id !== action.payload);
            })
            .addCase(deleteMovie.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export default moviesSlice.reducer;
