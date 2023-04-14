import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn/dist";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import useAuth from "../../hook/useAuth";

const InsertData = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const { user } = useAuth();
  const route = useRoute();

  const [hobbies, setHobbies] = useState(
    route.params.hobbies[route.params.hobbies.length - 1]
  );
  const [weight, setWeight] = useState(route.params.weight);
  const [height, setheight] = useState(route.params.height);
  const [fat, setFat] = useState(route.params.fatRate);
  const [medicine, setMedicine] = useState(
    route.params.medicine[route.params.medicine.length - 1]
  );
  const [vaccination, setVaccination] = useState(
    route.params.vaccination[route.params.vaccination.length - 1]
  );

  // console.log(route.params.hobbies[route.params.hobbies.length - 1]);

  const childrenRef = doc(db, "Children", route.params.id);
  const elderlyRef = doc(db, "Elderly", route.params.id);

  const date = new Date();

  const [result, setResult] = useState(0);

  // Calculate BMI of the user
  useEffect(() => {
    const calBMI = (weight, height) => {
      const weightNum = parseFloat(weight);
      const heightNum = parseFloat(height);
      if (!isNaN(weightNum) && !isNaN(heightNum) && heightNum !== 0) {
        const result = weightNum / (heightNum * heightNum);
        setResult(result.toFixed(2));
      } else {
        setResult(0);
      }
      // const result = weight / (height * height);
      // setResult(parseFloat(result).toFixed(2));
    };
    calBMI(weight, height);
  }, [weight, height]);

  const insertChildren = async () => {
    try {
      if (!hobbies) return alert("Hobbies field cannot be empty");

      if (!weight) return alert("Weight field cannot be empty");

      if (!height) return alert("height field cannot be empty");

      if (!fat) return alert("Fat percentage field cannot be empty");

      if (!medicine) return alert("Medicine history field cannot be empty");

      if (!vaccination)
        return alert("Vaccination history field cannot be empty");

      const updatedChildrenData = {
        hobbies: arrayUnion(hobbies),
        bodyComposition: arrayUnion({
          weight: weight,
          height: height,
          fatRate: fat,
          BMI: result,
          createdAt: date,
        }),
        medicine: arrayUnion(medicine),
        vaccination: arrayUnion(vaccination),
        parentId: user.uid,
      };

      await updateDoc(childrenRef, updatedChildrenData);

      setHobbies("");
      setWeight("");
      setheight("");
      setFat("");
      setMedicine("");
      setVaccination("");
      navigation.navigate("Children");
    } catch (error) {
      // alert(`An error occurred: ${error.message}`);
      // console.log(error);
      // alert(error.message);
    }
  };

  const insertElderly = async () => {
    try {
      if (!hobbies) return alert("Hobbies field cannot be empty");

      if (!weight) return alert("Weight field cannot be empty");

      if (!height) return alert("height field cannot be empty");

      if (!fat) return alert("Fat percentage field cannot be empty");

      if (!medicine) return alert("Medicine history field cannot be empty");

      if (!vaccination)
        return alert("Vaccination history field cannot be empty");

      const updatedElderlyData = {
        hobbies: arrayUnion(hobbies),
        bodyComposition: arrayUnion({
          weight: weight,
          height: height,
          fatRate: fat,
          BMI: result,
          createdAt: date,
        }),
        medicine: arrayUnion(medicine),
        vaccination: arrayUnion(vaccination),
        parentId: user.uid,
      };

      await updateDoc(elderlyRef, updatedElderlyData);

      setHobbies("");
      setWeight("");
      setheight("");
      setFat("");
      setMedicine("");
      setVaccination("");
      navigation.navigate("Elderly");
    } catch (error) {
      // alert(`An error occurred: ${error.message}`);
      // alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 90}
      style={tailwind("flex flex-1 mx-2")}
    >
      <View style={tailwind("relative h-full")}>
        {/* Input hobbies of the family member */}
        <View style={tailwind("p-2")}>
          <Text>Hobbies:</Text>
          <TextInput
            // id
            required
            keyboardType="text"
            value={hobbies}
            onChangeText={setHobbies}
            placeholder="Enter hobbies "
          />
        </View>
        {/* Input weight of the family member */}
        <View style={tailwind("p-2")}>
          <Text>
            Weight:<Text style={tailwind("text-red-600")}>*</Text>
          </Text>
          <TextInput
            // id
            required
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
            placeholder="Enter weight"
          />
        </View>
        {/* Input height of the family member */}
        <View style={tailwind("p-2")}>
          <Text>
            height:<Text style={tailwind("text-red-600")}>*</Text>
          </Text>
          <TextInput
            // id
            required
            keyboardType="text"
            value={height}
            onChangeText={setheight}
            placeholder="Enter height in m"
          />
        </View>
        {/* Input fatRate of the family member */}
        <View style={tailwind("p-2")}>
          <Text>
            Fat Rate:<Text style={tailwind("text-red-600")}>*</Text>
          </Text>
          <TextInput
            // id
            required
            keyboardType="text"
            value={fat}
            onChangeText={setFat}
            placeholder="Enter fatRate"
          />
        </View>
        {/* Input medicine of the family member */}
        <View style={tailwind("p-2")}>
          <Text>Medicine:</Text>
          <TextInput
            // id
            required
            keyboardType="text"
            value={medicine}
            onChangeText={setMedicine}
            placeholder="Enter medicine"
          />
        </View>
        {/* Input height of the family member */}
        <View style={tailwind("p-2")}>
          <Text>Vaccination:</Text>
          <TextInput
            // id
            required
            keyboardType="text"
            value={vaccination}
            onChangeText={setVaccination}
            placeholder="Enter vaccination"
          />
        </View>
      </View>
      {/* Button to submit the form to the db */}
      <TouchableOpacity
        style={tailwind(
          "absolute bottom-6 left-0 bg-indigo-700 rounded-full w-full h-10 items-center justify-center"
          // "mt-44 bg-indigo-700 rounded-full w-full h-10 items-center justify-center"
        )}
        onPress={() => {
          insertChildren();
          insertElderly();
        }}
      >
        <Text style={tailwind("font-bold text-white")}>Update</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default InsertData;
