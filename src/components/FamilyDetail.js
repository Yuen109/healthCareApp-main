import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import FamilyDetailBox from "../components/FamilyDetailBox";

const FamilyDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    navigation.setOptions({ title: route.params.data.name });
  }, [route.params.data.name]);

  const extractedData = route.params.data.bodyComposition.map(
    ({ fatRate, weight, height, BMI, createdAt }) => ({
      height,
      weight,
      fatRate,
      BMI,
      createdAt,
    })
  );
  // console.log(extractedData[extractedData.length - 1].weight);
  // console.log(extractedData[extractedData.length - 1].BMI);
  // console.log(extractedData[extractedData.length - 1].createdAt.seconds);

  return (
    <View>
      <FamilyDetailBox
        id={route.params.data.id}
        age={route.params.data.age}
        gender={route.params.data.gender}
        weight={extractedData[extractedData.length - 1].weight}
        height={extractedData[extractedData.length - 1].height}
        fatRate={extractedData[extractedData.length - 1].fatRate}
        bmi={extractedData[extractedData.length - 1].BMI}
        createdAt={extractedData[extractedData.length - 1].createdAt}
        hobbies={route.params.data.hobbies}
        vaccination={route.params.data.vaccination}
        medicine={route.params.data.medicine}
      />
      {/* <Text>name {route.params.data.name}</Text> */}
      {/* <Text>age {route.params.data.age}</Text>
      <Text>gender {route.params.data.gender}</Text>
      <Text>weight {route.params.data.bodyComposition.weight}</Text>
      <Text>height {route.params.data.bodyComposition.height}</Text>
      <Text>fat {route.params.data.bodyComposition.fatRate}</Text>
      <Text>hobbies {route.params.data.hobbies}</Text>
      {route.params.data.vaccination ? (
        <Text>vaccination {route.params.data.vaccination}</Text>
      ) : undefined}
      {route.params.data.medicine ? (
        <Text>medicine {route.params.data.medicine}</Text>
      ) : undefined} */}
    </View>
  );
};

export default FamilyDetail;
