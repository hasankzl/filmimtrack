import React from "react";
import { View, Text } from "react-native";
import { Appbar, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../firebase";
import { signOut } from "@firebase/auth";

const StackHeader = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <Appbar.Header>
      <Appbar.Content
        onPress={() => navigation.navigate("Home")}
        title="filmimTrack"
      />
      <Text
        style={{ color: "white", fontSize: 20, marginRight: 20 }}
        onPress={() => navigation.navigate("Profile")}
      >
        Profile
      </Text>

      <Appbar.Action icon="logout" onPress={handleSignOut} />
    </Appbar.Header>
  );
};

export default StackHeader;
