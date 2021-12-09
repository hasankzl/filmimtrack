import { signOut } from "@firebase/auth";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import { getMostPopularMovies } from "../api/Index";
import { auth } from "../firebase";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
const HomeScreen = () => {
  const [movies, setMovies] = useState([]);

  useEffect(async () => {
    const data = await getMostPopularMovies();
    console.log(data[1]);
    setMovies(data);
  }, []);
  return (
    <ScrollView style={styles.container}>
      {movies.map((movie) => {
        return (
          <Card>
            <Card.Content>
              <Title>{movie.title}</Title>
              <Paragraph>{movie.overview}</Paragraph>
            </Card.Content>
            <Card.Cover
              source={{
                uri: "https://image.tmdb.org/t/p/w1280/" + movie.poster_path,
              }}
            />
            <Card.Actions>
              <Button>İncele</Button>
            </Card.Actions>
          </Card>
        );
      })}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
