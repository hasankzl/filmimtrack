import { signOut } from "@firebase/auth";
import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import {
  getMostPopularMovies,
  searchMovieByName,
  addMovie,
  deleteMovie,
  getMoviesByUser,
} from "../api/Index";
import { auth } from "../firebase";
import { Button, Card, Title, Paragraph, Searchbar } from "react-native-paper";
const HomeScreen = ({ navigation }) => {
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
    if (q == "") {
      setSearchQuery(q);
      const data = await getMostPopularMovies();
      setMovies(data);
    } else {
      setSearchQuery(q);
      const data = await searchMovieByName(q);
      setMovies(data);
    }
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
          return (
            <Card style={styles.card} key={movie.title}>
              <Card.Content>
                <Title style={{ textAlign: "center" }}>{movie.title}</Title>
                <Text></Text>
                <Text>Puan : {movie.vote_average}</Text>
                <Text></Text>

                <Text>Çıkış Tarihi : {movie.release_date}</Text>
                <Text></Text>
              </Card.Content>
              <Card.Cover
                resizeMode="stretch"
                style={styles.image}
                source={{
                  uri: "https://image.tmdb.org/t/p/w780/" + movie.poster_path,
                }}
              />
              <Card.Actions>
                <Button
                  onPress={() =>
                    navigation.navigate("Review", {
                      movie,
                      isSelected,
                    })
                  }
                >
                  INCELE
                </Button>
                {isSelected ? (
                  <Button onPress={() => remove(isSelected.id)}>
                    Listede bulunuyor
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
    alignSelf: "center",
    height: 400,
    width: "100%",
    borderWidth: 1,
    margin: 10,
  },
  card: {
    height: 620,
    borderWidth: 1,
    borderStyle: "dashed",
    margin: 8,
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
