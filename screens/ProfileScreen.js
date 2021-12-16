import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { deleteMovie, getMoviesByUser } from "../api/Index";

import { View, Text, Image, ScrollView } from "react-native";

import { Card, ListItem, Button, Icon } from "react-native-elements";

const ProfileScreen = () => {
  const [movies, setMovies] = useState([]);

  useEffect(async () => {
    const data = await getMoviesByUser(auth.currentUser.uid);
    setMovies(data);
  }, []);

  const remove = async (id) => {
    await deleteMovie(id);
    const data = await getMoviesByUser(auth.currentUser.uid);
    setMovies(data);
  };
  return (
    <View>
      <ScrollView>
        {movies.map((m) => (
          <Card key={m.title}>
            <Card.Title>{m.title}</Card.Title>
            <Button
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
              }}
              title="Incele"
            />
            <Card.Divider />
            <Card.Image
              source={{
                uri: "https://image.tmdb.org/t/p/w780/" + m.img,
              }}
            ></Card.Image>

            <Card.Divider />
            <Button
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
              }}
              onPress={() => remove(m.id)}
              title="Takibi Bırak"
            />
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
