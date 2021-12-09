import axios from "axios";
import { getMostPopulerMoviesUrl, movieSearchUrl } from "../util/constant";

export const getMostPopularMovies = async () => {
  const data = await axios
    .get(getMostPopulerMoviesUrl)
    .then((res) => res.data.results);

  return data;
};

export const searchMovieByName = async (query) => {
  const data = await axios
    .get(movieSearchUrl + query)
    .then((res) => res.data.results);

  return data;
};
