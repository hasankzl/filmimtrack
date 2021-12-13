import axios from "axios";
import { db } from "../firebase";
import { getMostPopulerMoviesUrl, movieSearchUrl } from "../util/constant";
import {
  collection,
  addDoc,
  where,
  getDocs,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore/lite";
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

export const addMovie = async (userId, movie) => {
  try {
    const docRef = await addDoc(collection(db, "Movie"), {
      title: movie.title,
      img: movie.poster_path,
      userId,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
export const deleteMovie = async (id) => {
  const movieDoc = doc(db, "Movie", id);
  console.log(id);
  await deleteDoc(movieDoc);
};
export const getMoviesByUser = async (userId) => {
  const q = query(collection(db, "Movie"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const list = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    list.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return list;
};
