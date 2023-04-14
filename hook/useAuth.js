import { StyleSheet, Text, View, Image, Button, Platform } from "react-native";
import React, { createContext, useContext, useState, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import { onAuthStateChanged } from "firebase/auth";

import { Firestore } from "firebase/firestore";
import { auth } from "../firebase/firebase";

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        // googleSignIn
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
