import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import React from "react";
import DetailBoxData from "./DetailBoxData";

const MedicialDetail = () => {
  const route = useRoute();

  return (
    <DetailBoxData title={"Medicial Detail"} data={route.params.medicine} />
  );
};

export default MedicialDetail;
