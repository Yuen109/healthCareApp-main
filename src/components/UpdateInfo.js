import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn/dist";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import useAuth from "../../hook/useAuth";

const UpdateInfo = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  const { user } = useAuth();
  const route = useRoute();

  const [name, setName] = useState(route.params.data.name);
  const [age, setAge] = useState(route.params.data.age);
  const [gender, setGender] = useState(route.params.data.gender);

  const childrenRef = doc(db, "Children", route.params.data.id);
  const elderlyRef = doc(db, "Elderly", route.params.data.id);
  // console.log(route.params.data.bodyComposition.height);

  // Add date to the db
  const date = new Date();

  //   Update childen data stored in firebase
  const updateChildren = async () => {
    try {
      if (!name) return alert("Name field cannot be empty");
      if (!age) return alert("Age field cannot be empty");
      if (!gender || (gender != "M" && gender != "F"))
        return alert("Gender field cannot be empty");

      await updateDoc(childrenRef, {
        name: name,
        age: age,
        gender: gender,
      });
      setName("");
      setAge("");
      setGender("");
      navigation.goBack();
    } catch (error) {
      // alert(error);
    }
  };

  //   Update elderly data stored in firebase
  const updateElderly = async () => {
    try {
      if (!name) return alert("Name field cannot be empty");
      if (!age) return alert("Age field cannot be empty");
      if (!gender || (gender != "M" && gender != "F"))
        return alert("Gender field cannot be empty");

      await updateDoc(elderlyRef, {
        name: name,
        age: age,
        gender: gender,
      });
      setName("");
      setAge("");
      setGender("");
      navigation.goBack();
    } catch (error) {
      // alert(error);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 90}
      style={tailwind("flex flex-1 mx-2")}
    >
      <View style={tailwind("relative h-full")}>
        {/* Input name of the family member */}
        <View style={tailwind("p-2")}>
          <Text>
            Name:<Text style={tailwind("text-red-600")}>*</Text>
          </Text>
          <TextInput
            // id
            required
            keyboardType="text"
            value={name}
            onChangeText={setName}
            placeholder="Enter name "
          />
        </View>
        {/* Input age of the family member */}
        <View style={tailwind("p-2")}>
          <Text>
            Age:<Text style={tailwind("text-red-600")}>*</Text>
          </Text>
          <TextInput
            // id
            required
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
            placeholder="Enter age"
          />
        </View>
        {/* Input gender of the family member */}
        <View style={tailwind("p-2")}>
          <Text>Gender:</Text>
          <TextInput
            // id
            required
            keyboardType="text"
            value={gender}
            onChangeText={setGender}
            placeholder="Enter gender M or F"
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
          updateChildren();
          updateElderly();
        }}
      >
        <Text style={tailwind("font-bold text-white")}>Update</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default UpdateInfo;
