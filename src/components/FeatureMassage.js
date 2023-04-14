import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn/dist";
import { useNavigation } from "@react-navigation/native";

const FeatureMassage = ({ title, description, id, likedRoom }) => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={tailwind("mb-2 p-2 w-full h-24 bg-white rounded-lg")}
      onPress={() =>
        navigation.navigate("Chat", { id: likedRoom.id, name: likedRoom.name })
      }
    >
      <View style={tailwind("flex flex-row")}>
        {/* Show title name */}
        <Text style={tailwind("flex-1 text-sky-700 text-lg font-semibold")}>
          {/* {title} */}
          {likedRoom.title}
        </Text>
        {/* Show id of the user */}
        <Text style={tailwind("w-5 h-5 text-sm text-gray-500")}>
          {likedRoom.id}
        </Text>
      </View>
      {/* Show Description */}
      <Text style={tailwind("text-gray-500")} numberOfLines={2}>
        {likedRoom.description}{" "}
      </Text>
    </TouchableOpacity>
  );
};

export default FeatureMassage;
