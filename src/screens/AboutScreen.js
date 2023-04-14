import { View, Text } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn/dist";

const AboutScreen = () => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind("mx-2")}>
      <Text style={tailwind("text-sky-700 text-lg font-medium mb-2")}>
        About Us
      </Text>
      <Text>
        The application is build to help parent to manage their family mambers,
        and to help children to learn how to manage their own family. It has the
        feature to communicate, add personal data and so on.
      </Text>
    </View>
  );
};

export default AboutScreen;
