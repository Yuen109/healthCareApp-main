import { View, Text } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn/dist";

const DetailBoxData = ({ title, data }) => {
  const tailwind = useTailwind();

  const useData = data;

  // console.log(useData);

  return (
    <View style={tailwind("bg-white h-full")}>
      <Text style={tailwind("m-2 text-lg text-sky-700")}>{title}</Text>
      <View style={tailwind("w-full")}>
        {useData.map((item, index) => (
          <Text key={item} style={tailwind("m-2")}>
            {index + 1}. {item}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default DetailBoxData;
