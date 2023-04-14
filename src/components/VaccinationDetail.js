import { View, Text } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import DetailBoxData from "./DetailBoxData";

const VaccinationDetail = () => {
  const route = useRoute();
  return (
    <View>
      <DetailBoxData
        title={"Vaccination Detail"}
        data={route.params.vaccination}
      />
    </View>
  );
};

export default VaccinationDetail;
