import React, { useState } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { addMovie, deleteMovie } from "../api/Index";
import { auth } from "../firebase";
const Review = ({ route }) => {
  const movie = route.params.movie;
  const selected = route.params.isSelected;
  const d = selected ? selected.id : null;
  const [addedMovieId, setAddedMovieId] = useState(d);
  const add = async (movie) => {
    const id = await addMovie(auth.currentUser.uid, movie);
    setAddedMovieId(id);
  };
  const remove = async (id) => {
    await deleteMovie(id);
    setAddedMovieId(null);
  };
  return (
    <View>
      <ScrollView style={styles.container}>
        {addedMovieId ? (
          <Button onPress={() => remove(addedMovieId)}>
            Listede bulunuyor
          </Button>
        ) : (
          <Button onPress={() => add(movie)}>
            Listeme Ekle {addedMovieId}
          </Button>
        )}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={{ textAlign: "center" }}>{movie.title}</Title>
            <Text></Text>
            <Text>Puan : {movie.vote_average}</Text>
            <Text></Text>

            <Text>Çıkış Tarihi : {movie.release_date}</Text>
            <Text></Text>
            <Paragraph>{movie.overview}</Paragraph>
          </Card.Content>
          <Card.Cover
            style={styles.image}
            source={{
              uri: "https://image.tmdb.org/t/p/w1280/" + movie.poster_path,
            }}
          />
          <Card.Actions>
            {addedMovieId ? (
              <Button onPress={() => remove(addedMovieId)}>
                Listede bulunuyor
              </Button>
            ) : (
              <Button onPress={() => add(movie)}>
                Listeme Ekle {addedMovieId}
              </Button>
            )}
          </Card.Actions>
        </Card>
      </ScrollView>
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  card: {
    height: 800,
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
