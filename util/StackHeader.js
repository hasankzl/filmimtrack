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
        navigation.replace("Login");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <Appbar.Header>
      <Appbar.Content title="filmtrack" />

      <Appbar.Action icon="logout" onPress={handleSignOut} />
      <Text>{auth.currentUser?.email} </Text>
    </Appbar.Header>
  );
};

export default StackHeader;