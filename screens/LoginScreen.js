import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/core";

import { Button } from "react-native-paper";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);
  const handleSignUp = () => {
    if (email == "" || email.includes("@") == false) {
      alert("kayıt olmak için lütfen geçerli bir email giriniz");
      return;
    }
    if (password == "") {
      alert(" kayıt olmak için lütfem bir şifre giriniz");
      return;
    }
    if (password.length < 6) {
      alert("şifre 6  karakter uzunluğunda olmalıdır");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        alert("kayıt başarılı");
      })
      .catch((error) => console.log(error.message));
  };

  const handleLogin = () => {
    if (email == "" || email.includes("@") == false) {
      alert("giriş yapmak için lütfen geçerli bir email giriniz");
      return;
    }
    if (password == "") {
      alert(" giriş yapmak için lütfen bir şifre giriniz");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
      })
      .catch((error) => alert("email veya şifre yanlış"));
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Email</Text>
        <TextInput
          placeholder="Email giriniz"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <Text style={styles.inputText}>Şifre</Text>
        <TextInput
          placeholder="Şifre giriniz"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button onPress={handleLogin} style={[styles.button]}>
          <Text style={styles.buttonText}>Giriş</Text>
        </Button>
        <Button
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Kayıt</Text>
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#7082F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  inputText: {
    color: "#0782F9",
    fontWeight: "800",
    fontSize: 16,
    padding: 10,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
