import axios from "axios";
const API_URL = "https://be-project-movie.onrender.com/api/films";

export const getMoviesDetail = async (slug) => {
    try {
        const response = await axios.get(`${API_URL}/${slug}`);
        return response.data.movie || [];
    } catch (error) {
        console.log("Error getMoviesDetail: " + error);
    }
}

export const getMoviesByCategory = async (slug, page = 1) => {
    try {
        const response = await axios.get(`${API_URL}/the-loai/${slug}?page=${page}`);
        console.log('API response:', response.data);
        return response.data || [];
    } catch (error) {
        console.error('Error fetching movies by category:', error);
        return [];
    }
};
