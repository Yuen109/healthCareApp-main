import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { useTailwind } from "tailwind-rn/dist";
import { useNavigation } from "@react-navigation/native";
import InsertData from "./InsertData";
import { Entypo } from "@expo/vector-icons";

const FamilyDetailBox = ({
  id,
  age,
  gender,
  weight,
  height,
  fatRate,
  bmi,
  hobbies,
  vaccination,
  medicine,
}) => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 5 }}
          onPress={() =>
            navigation.navigate("Insert Info", {
              id,
              bmi,
              weight,
              height,
              fatRate,
              hobbies,
              vaccination,
              medicine,
            })
          }
        >
          <Entypo name="plus" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={tailwind("mx-2 h-full flex-row flex-wrap justify-around")}>
      {/* Display name of the user */}
      <View
        style={tailwind(
          "my-4 w-44 h-36 bg-indigo-300 rounded-lg items-center justify-center"
        )}
      >
        <Text style={tailwind("text-lg text-sky-700")}>Age</Text>
        <Text>{age}</Text>
      </View>
      {/* Display gender of the user */}
      <View
        style={tailwind(
          "my-4 w-44 h-36 bg-indigo-300 rounded-lg items-center justify-center"
        )}
      >
        <Text style={tailwind("text-lg text-sky-700")}>Gender </Text>
        <Text>{gender}</Text>
      </View>
      {/* Display body composition of the user */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Health Detail", {
            id,
            weight,
            height,
            fatRate,
            bmi,
          })
        }
        style={tailwind(
          "w-full h-36 items-center justify-center bg-indigo-300 rounded-lg"
        )}
      >
        <Text style={tailwind("text-lg text-sky-700")}>Body Composition</Text>
        {/* Showing the calculation by updating the weight and height */}
        <Text>
          BMI: {bmi}kg/m
          <Text style={{ fontSize: 15, lineheightt: 18 }}>2</Text>
        </Text>
        {/* <Text>
          BMI: {result}kg/m
          <Text style={{ fontSize: 15, lineheightt: 18 }}>2</Text>
        </Text> */}
        <Text>Weight: {weight}kg</Text>
        <Text>height: {height}m</Text>
        <Text>Fat Rate: {fatRate}%</Text>
      </TouchableOpacity>
      {/* Display hobbie of the user */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Hobbies Detail", { hobbies })}
        style={tailwind(
          "my-4 w-44 h-36 bg-indigo-300 rounded-lg items-center justify-center"
        )}
      >
        <Text style={tailwind("text-lg text-sky-700")}>Hobbies</Text>
        <Text>{hobbies[hobbies.length - 1]}</Text>
      </TouchableOpacity>
      {/* Display the vaccination info of the user */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Vaccination Detail", { vaccination })
        }
        style={tailwind(
          "my-4 w-44 h-36 bg-indigo-300 rounded-lg items-center justify-center"
        )}
      >
        {vaccination ? (
          <>
            <Text style={tailwind("text-lg text-sky-700")}>Vaccination</Text>
            <Text>{vaccination[vaccination.length - 1]}</Text>
          </>
        ) : (
          <Text style={tailwind("text-sky-700")}>No data</Text>
        )}
      </TouchableOpacity>
      {/* Display the mdicine info of the user */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Medical Detail", { medicine })}
        style={tailwind(
          //   "w-11/12 h-40 bg-indigo-300 rounded-lg items-center justify-center"
          "w-full h-36 bg-indigo-300 rounded-lg items-center justify-center"
        )}
      >
        {medicine ? (
          <>
            <Text style={tailwind("text-lg text-sky-700")}>Medicine </Text>
            <Text>{medicine[medicine.length - 1]}</Text>
          </>
        ) : (
          <Text style={tailwind("text-sky-700")}>No data</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default FamilyDetailBox;
