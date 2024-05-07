import axios from 'axios';

const options = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZmE1NTliMDA5ZTlmMWE2OGM3Y2RiY2ZkM2NlODMwMyIsInN1YiI6IjY2MzI2YjdiOTlkNWMzMDEyNjU2MzAzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.taSDIvrivKnLbLDS5d2ihnNahdT9d01bvjPxlcaVsdI',
  },
};

export async function getTrendingMovies() {
  const url = 'https://api.themoviedb.org/3/trending/movie/day';
  const response = await axios.get(url, options);
  return response.data.results;
}

export async function searchMovies(query) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}`;
  const response = await axios.get(url, options);
  return response.data.results;
}

export async function getMovieData(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}`;
  const response = await axios.get(url, options);
  return response.data;
}

export async function getMovieCredits(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
  const response = await axios.get(url, options);
  return response.data.cast;
}

export async function getMovieReviews(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;
  const response = await axios.get(url, options);
  return response.data.results;
}
