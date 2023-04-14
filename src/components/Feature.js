import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useTailwind } from "tailwind-rn/dist";
import { useNavigation } from "@react-navigation/native";

const Feature = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  return (
    <View style={tailwind("flex mb-2 flex-row justify-evenly")}>
      {/* Children */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Children")}
        style={tailwind(
          "items-center content-center pt-6 w-44 h-24 bg-white rounded-lg"
        )}
      >
        <FontAwesome5 name="child" size={24} color="black" />
        <Text
          style={tailwind(
            "mt-1 text-sky-700 font-semibold items-center content-center"
          )}
        >
          Children
        </Text>
      </TouchableOpacity>
      {/* Elderly */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Elderly")}
        style={tailwind(
          "items-center content-center pt-6 w-44 h-24 bg-white rounded-lg"
        )}
      >
        <MaterialIcons name="elderly" size={24} color="black" />
        <Text
          style={tailwind(
            "mt-1 text-sky-700 font-semibold items-center content-center"
          )}
        >
          Elderly
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Feature;
