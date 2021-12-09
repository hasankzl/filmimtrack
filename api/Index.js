import axios from "axios";
import { getMostPopulerMoviesUrl } from "../util/constant";

export const getMostPopularMovies = async () => {
  const data = await axios
    .get(getMostPopulerMoviesUrl)
    .then((res) => res.data.results);

  console.log(data);
  return data;
};
