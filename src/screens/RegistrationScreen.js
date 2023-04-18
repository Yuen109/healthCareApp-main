import { View, Text, TextInput, Button } from "react-native";
import React, { useState, useRef } from "react";
import { useTailwind } from "tailwind-rn/dist";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import useAuth from "../../hook/useAuth";

const Registration = () => {
  const tailwind = useTailwind();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // const { signup } = useAuth()
  const auth = getAuth();

  const handleCreateUser = async () => {
    if (password !== passwordConfirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // Signed in
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View
      style={tailwind(
        "bg-yellow-400 relative h-full justify-center items-center"
      )}
    >
      <Text style={tailwind("absolute top-20 text-xl font-bold")}>Sign Up</Text>
      <View style={tailwind("mt-3")}>
        <Text style={tailwind("text-lg")}>Step 1: Email</Text>
        <TextInput
          placeholder="Enter Email"
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
          autoCorrect={false}
          style={tailwind("my-1 p-1")}
        />
        <Text style={tailwind("text-lg")}>Step 2: Password</Text>
        <TextInput
          placeholder="Enter Password"
          onChangeText={setPassword}
          value={password}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          style={tailwind("my-1 p-1")}
        />
        <Text style={tailwind("text-lg")}>Step 3: Password Confirmation</Text>
        <TextInput
          placeholder="Enter Password Again"
          onChangeText={setPasswordConfirm}
          value={passwordConfirm}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          style={tailwind("my-1 p-1")}
        />
      </View>
      <Button
        title="Sign Up"
        color="#0235A3"
        onPress={() => handleCreateUser()}
      />
    </View>
  );
};

export default Registration;
