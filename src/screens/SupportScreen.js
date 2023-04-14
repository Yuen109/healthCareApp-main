import { View, Text } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn/dist";

const SupportScreen = () => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind("mb-4 mx-2")}>
      <Text style={tailwind("text-sky-700 text-lg font-medium mb-2")}>
        Contact Us
      </Text>
      <View style={tailwind("flex-row items-center")}>
        <Text style={tailwind("text-sky-700 text-base font-medium")}>
          Email Us
        </Text>
      </View>
      <Text style={tailwind("text-sm  mb-4")}>clyuen26-c@my.cityu.edu.hk</Text>
      <View style={tailwind("flex-row items-center")}>
        <Text style={tailwind("text-sky-700 text-base font-medium")}>
          Call Us
        </Text>
      </View>
      <Text style={tailwind("text-sm mb-4")}>53662026</Text>
    </View>
  );
};

export default SupportScreen;
