import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import useAuth from "../../hook/useAuth";
import { useTailwind } from "tailwind-rn/dist";
import ScrollArea from "../components/ScrollArea";
import ScrollCard from "../components/ScrollCard";
import FeatureBoard from "../components/FeatureBoard";
import Feature from "../components/Feature";

const Dashboard = () => {
  const tailwind = useTailwind();
  const { user } = useAuth();
  // console.log(user.uid);

  return (
    <View style={tailwind("h-full flex-1")}>
      <View style={tailwind("flex bg-indigo-300 h-72 rounded-bl-3xl")}>
        {/* Header Title */}
        <View style={tailwind("px-2")}>
          <Text style={tailwind("mt-12 text-xl font-semibold")}>
            Hello, {user.email}
          </Text>
          <Text style={tailwind("mt-2")}>You May Find Cure Here!</Text>
        </View>
        {/* Header scroll card */}
        <ScrollArea />
      </View>
      <View style={tailwind("mx-2")}>
        <Text style={tailwind("text-lg font-medium")}>Featured For You</Text>
        {/* Button for children and Elderly */}
        <Feature />
        {/* The Vertical scroll bar */}
      </View>
      <Text style={tailwind("mx-2 text-lg font-medium")}>Your Chat Rooms</Text>
      <FeatureBoard />
    </View>
  );
};

export default Dashboard;
