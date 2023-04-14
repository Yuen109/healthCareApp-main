import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebase, firestore } from "@firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { useTailwind } from "tailwind-rn/dist";
import useAuth from "../../hook/useAuth";
import ProfileScreen from "./ProfileScreen";
import SupportScreen from "./SupportScreen";

const MenuScreen = () => {
  const navigation = useNavigation();
  const tailwind = useTailwind();
  const auth = getAuth();
  const { user } = useAuth();

  const handleSignOut = async () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <>
      {/* Profile */}
      <Button
        title="Profile"
        color="#0235A3"
        onPress={() => navigation.navigate("Profile Screen")}
      />
      {/* Help/Support  */}
      <Button
        title="Help/Support"
        color="#0235A3"
        onPress={() => navigation.navigate("Support Screen")}
      />
      {/* About  */}
      <Button
        title="About"
        color="#0235A3"
        onPress={() => navigation.navigate("About Screen")}
      />
      {/* Logout button */}
      <Button
        title="Sign Out"
        color="#ff4040"
        onPress={() => handleSignOut()}
      />
    </>
  );
};

export default MenuScreen;
