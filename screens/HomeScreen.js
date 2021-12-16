import { signOut } from "@firebase/auth";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";
import {
  getMostPopularMovies,
  searchMovieByName,
  addMovie,
  deleteMovie,
  getMoviesByUser,
} from "../api/Index";
import { auth } from "../firebase";
import { Button, Card, Title, Paragraph, Searchbar } from "react-native-paper";
import inceleScreen from "./incele";
const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [myMovieList, setMyMovieList] = useState([]);
  useEffect(async () => {
    const data = await getMostPopularMovies();
    setMovies(data);
    const d = await getMoviesByUser(auth.currentUser.uid);
    setMyMovieList(d);
  }, []);

  const HandleSearch = async (q) => {
    setSearchQuery(q);
    const data = await searchMovieByName(q);
    console.log(data[1]);
    setMovies(data);
  };

  const add = async (movie) => {
    await addMovie(auth.currentUser.uid, movie);
    const d = await getMoviesByUser(auth.currentUser.uid);
    setMyMovieList(d);
  };

  const remove = async (id) => {
    await deleteMovie(id);
    const d = await getMoviesByUser(auth.currentUser.uid);
    setMyMovieList(d);
  };
  return (
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={HandleSearch}
        value={searchQuery}
      />
      <ScrollView style={styles.container}>
        {movies.map((movie) => {
          const isSelected = myMovieList.find(
            (selected) => selected.title === movie.title
          );
          console.log(isSelected);
          return (
            <Card style={styles.card} key={movie.title}>
              <Card.Content>
                <Title>{movie.title}</Title>
                <Paragraph style={styles.paragraph}>{movie.overview}</Paragraph>
              </Card.Content>
              <Card.Cover
                style={styles.image}
                source={{
                  uri: "https://image.tmdb.org/t/p/w1280/" + movie.poster_path,
                }}
              />
              <Card.Actions>
                <Button onPress={() => inceleScreen(movie.title,"https://image.tmdb.org/t/p/w1280/" + movie.poster_path,movie.overview)}>İNCELE</Button>
                {isSelected ? (
                  <Button onPress={() => remove(isSelected.id)}>
                    Bu film listenizde bulunmaktadır, silmek için tıklayınız
                  </Button>
                ) : (
                  <Button onPress={() => add(movie)}>Listeme Ekle</Button>
                )}
              </Card.Actions>
            </Card>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  paragraph: {
    height: 100,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  card: {
    height: 500,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "50%",
    padding: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
