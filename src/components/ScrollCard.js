import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn/dist";
import { useNavigation } from "@react-navigation/native";

const ScrollCard = ({ img, title, heading, discription }) => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  // console.log(discription);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Description", { title, heading, discription })
      }
      style={tailwind("relative mr-2")}
    >
      <Image
        source={{
          uri: img,
        }}
        style={tailwind("w-40 h-40 bg-white rounded-xl")}
      />
      <Text
        style={tailwind("text-white font-semibold absolute bottom-6 left-1")}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ScrollCard;
