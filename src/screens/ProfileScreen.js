import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import useAuth from "../../hook/useAuth";
import { useTailwind } from "tailwind-rn/dist";

const ProfileScreen = () => {
  // Get the current user
  const { user } = useAuth();
  const tailwind = useTailwind();
  //   console.log(user);

  return (
    <View>
      {user ? (
        <>
          <View style={tailwind("mx-2")}>
            <Text style={tailwind("text-sky-700 text-lg font-medium mb-2")}>
              User Information
            </Text>
            <Text style={tailwind("text-sky-700 text-base font-medium")}>
              User Id
            </Text>
            <Text style={tailwind("mb-4")}>{user.uid}</Text>
            <Text style={tailwind("text-sky-700 text-base font-medium")}>
              User Email
            </Text>
            <Text>{user.email}</Text>
          </View>
        </>
      ) : (
        <Text>No user is signed in.</Text>
      )}
    </View>
  );
};

export default ProfileScreen;
