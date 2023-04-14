import { View, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn/dist";

const ScrollCardDescriptionScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const tailwind = useTailwind();

  useEffect(() => {
    navigation.setOptions({ title: route.params.title });
  }, [route.params.title]);
  //   console.log(route.params.discription);
  return (
    <ScrollView style={tailwind("mx-2 ")}>
      <Text style={tailwind("text-lg font-medium text-sky-700")}>
        {route.params.heading}
      </Text>
      <Text style={tailwind("")}>{route.params.discription}</Text>
    </ScrollView>
  );
};

export default ScrollCardDescriptionScreen;
