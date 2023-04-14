import { View, Text } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import DetailBoxData from "./DetailBoxData";

const HobbiesDetail = () => {
  const route = useRoute();
  return (
    <View>
      <DetailBoxData title={"Hobbies Detail"} data={route.params.hobbies} />
    </View>
  );
};

export default HobbiesDetail;
