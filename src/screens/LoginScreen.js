import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  StatusBar,
  Image,
} from "react-native";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn/dist";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const AuthContext = createContext();

const Login = () => {
  const navigation = useNavigation();
  const tailwind = useTailwind();

  // const [userInfo, setUserInfo] = useState();
  // const [auth, setAuth] = useState();
  // const [requireRefresh, setRequireRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUsers = async () => {
    try {
      setLoading(true);
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <View>
      <View
        style={tailwind(
          "bg-yellow-400 relative h-full justify-center items-center"
        )}
      >
        <Text style={tailwind("absolute top-20 text-xl font-bold")}>
          Welcome & Log In
        </Text>
        <Text style={tailwind("text-lg")}>Step 1: Email Address</Text>
        <View>
          <TextInput
            placeholder="Email"
            onChangeText={(email) => setEmail(email)}
            autoCapitalize="none"
            autoCorrect={false}
            style={tailwind("my-1 p-1")}
          />
          <Text style={tailwind("text-lg")}>Step 2: Password</Text>
          <TextInput
            placeholder="Password"
            onChangeText={(password) => setPassword(password)}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            style={tailwind("my-2")}
          />
          <Button title="Log In" color="#0235A3" onPress={() => loginUsers()} />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Registration")}
            style={tailwind("mt-2")}
          >
            <Text>Don't have an account? Create now</Text>
          </TouchableOpacity>
        </View>
        {/* <StatusBar style="auto" /> */}
      </View>
    </View>
  );
};
export default Login;
