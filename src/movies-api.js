import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZmE1NTliMDA5ZTlmMWE2OGM3Y2RiY2ZkM2NlODMwMyIsInN1YiI6IjY2MzI2YjdiOTlkNWMzMDEyNjU2MzAzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.taSDIvrivKnLbLDS5d2ihnNahdT9d01bvjPxlcaVsdI';

async function getData(endpoint) {
  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('An error occurred:', error.message);
    throw error; 
  }
}

export async function getTrendingMovies() {
  return await getData('/trending/movie/day');
}

export async function searchMovies(query) {
  return await getData(`/search/movie?query=${query}`);
}

export async function getMovieData(movieId) {
  return await getData(`/movie/${movieId}`);
}

export async function getMovieCredits(movieId) {
  return await getData(`/movie/${movieId}/credits`);
}

export async function getMovieReviews(movieId) {
  return await getData(`/movie/${movieId}/reviews`);
}
