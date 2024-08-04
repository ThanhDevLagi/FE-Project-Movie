import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://be-project-movie.onrender.com/api";

// Async thunk to fetch comments
export const getComments = createAsyncThunk('comments/getComments', async ({ movieSlug }) => {
    const response = await axios.get(`${API_BASE_URL}/getComments/${movieSlug}`);
    console.log("Fetched comments for:", movieSlug, response.data);
    return response.data;
});


// Async thunk to post a comment
export const postComments = createAsyncThunk(
    "comments/postComments",
    async ({ userId, movieSlug, comment }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/comments`, {
                userId,
                movieSlug,
                comment
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
// Async thunk to post a reply to a comment
export const postCommentsReply = createAsyncThunk('comments/postReply', 
    async ({ userId, commentId, reply}, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/commentsReply/${commentId}`, { userId, reply });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }

});

const commentSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: [],
        loading: false,
        error: null
    },
    reducers: {
        clearComments: (state) => {
            state.comments = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postComments.pending, (state) => {
                state.loading = true;
            })
            .addCase(postComments.fulfilled, (state, action) => {
                state.loading = false;
                state.comments.push(action.payload);
            })
            .addCase(postComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(postCommentsReply.pending, (state) => {
                state.loading = true;
            })
            .addCase(postCommentsReply.fulfilled, (state, action) => {
                state.loading = false;
                const comment = state.comments.find(c => c._id === action.payload._id);
                if (comment) {
                    comment.replies.push(action.payload.replies[0]);
                }
            })
            .addCase(postCommentsReply.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getComments.pending, (state) => {
                state.loading = true;
            })
            .addCase(getComments.fulfilled, (state, action) => {
                if (action.payload.length === 0) {
                    state.comments = [];
                } else {
                    state.comments = action.payload;
                }
                state.loading = false;
            })
            .addCase(getComments.rejected, (state, action) => {
                state.loading = false;
            });
    }
});

export const { clearComments } = commentSlice.actions;
export default commentSlice.reducer;

