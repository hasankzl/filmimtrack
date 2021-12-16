import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
} from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";

const a = (a,b,c) => {
  console.log(a,b,c);
}
const inceleScreen = (title,image,paragrapf) => {
  return (
    <View>
      <ScrollView style={styles.container}>
            <Card style={styles.card}>
              <Card.Content>
                <Title>{title}</Title>
                <Paragraph style={styles.paragraph}>{paragrapf}</Paragraph>
              </Card.Content>
              <Card.Cover
                style={styles.image}
                source={{
                  uri: image,
                }}
              />
              <Card.Actions>
                <Button onPress={a(title +"\n\n",image +"\n\n",paragrapf +"\n\n")}>TAKİP ET</Button>
              </Card.Actions>
            </Card>
      </ScrollView>
    </View>
  );
};

export default inceleScreen;

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
