import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn/dist";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import useAuth from "../../hook/useAuth";

const AddElderly = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  const { user } = useAuth();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState(["M" || "F"]);
  const [hobbies, setHobbies] = useState([]);
  const [weight, setWeight] = useState("");
  const [height, setheight] = useState("");
  const [fat, setFat] = useState("");
  const [medicine, setMedicine] = useState([]);
  const [vaccination, setVaccination] = useState([]);

  // Add date to the db
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

  // Function to add elderly to the db
  const uploadToElderly = async () => {
    try {
      if (!name) return alert("Name field cannot be empty");
      if (!age || age < 64)
        return alert("Age field cannot be empty and cannot be younger than 65");
      if (!gender || (gender != "M" && gender != "F"))
        return alert("Gender field cannot be empty");
      if (!hobbies) return alert("Hobbies field cannot be empty");
      if (!weight) return alert("Weight field cannot be empty");
      if (!height) return alert("height field cannot be empty");
      if (!fat) return alert("Fat percentage field cannot be empty");
      if (!medicine) return alert("Medicine history field cannot be empty");
      if (!vaccination)
        return alert("Vaccination history field cannot be empty");
      // await setDoc(doc(db, "Elderly", name), {
      await addDoc(collection(db, "Elderly"), {
        name: name,
        age: Number(age),
        gender: gender,
        hobbies: arrayUnion(hobbies),
        bodyComposition: arrayUnion({
          weight: Number(weight),
          height: Number(height),
          fatRate: Number(fat),
          BMI: Number(result),
          createdAt: date,
        }),
        medicine: arrayUnion(medicine),
        vaccination: arrayUnion(vaccination),
        parentId: user.uid,
        createdAt: date,
      });
      setName("");
      setAge("");
      setGender("");
      setHobbies("");
      setWeight("");
      setheight("");
      setFat("");
      setMedicine("");
      setVaccination("");
      navigation.navigate("Elderly");
    } catch (error) {
      alert(error.massage);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 90}
      style={tailwind("flex flex-1 mx-2")}
    >
      <View style={tailwind("")}>
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
            placeholder="Enter name"
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
          <Text>
            Gender:<Text style={tailwind("text-red-600")}>*</Text>
          </Text>
          <TextInput
            // id
            required
            keyboardType="text"
            value={gender}
            onChangeText={setGender}
            placeholder="Enter gender M or F"
          />
        </View>
        {/* Input hobbies of the family member */}
        <View style={tailwind("p-2")}>
          <Text>
            Hobbies:<Text style={tailwind("text-red-600")}>*</Text>
          </Text>
          <TextInput
            // id
            required
            keyboardType="text"
            value={hobbies}
            onChangeText={setHobbies}
            placeholder="Enter some hobbies "
          />
        </View>
        {/* Input weight of th family member */}
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
            placeholder="Enter your weight in kg"
          />
        </View>
        {/* Input height of th family member */}
        <View style={tailwind("p-2")}>
          <Text>
            height:<Text style={tailwind("text-red-600")}>*</Text>
          </Text>
          <TextInput
            // id
            required
            keyboardType="numeric"
            value={height}
            onChangeText={setheight}
            placeholder="Enter height in m"
          />
        </View>
        {/* Input Fat of th family member */}
        <View style={tailwind("p-2")}>
          <Text>
            Fat Percentage:<Text style={tailwind("text-red-600")}>*</Text>
          </Text>
          <TextInput
            // id
            required
            keyboardType="numeric"
            value={fat}
            onChangeText={setFat}
            placeholder="Enter your body fat in percentage"
          />
        </View>
        {/* Input medicine of the family member */}
        <View style={tailwind("p-2")}>
          <Text>
            Medicine History:<Text style={tailwind("text-red-600")}>*</Text>
          </Text>
          <TextInput
            // id
            required
            keyboardType="text"
            value={medicine}
            onChangeText={setMedicine}
            placeholder="Enter your medicine history"
          />
        </View>
        {/* Input vaccination of the family member */}
        <View style={tailwind("p-2")}>
          <Text>
            Vaccination:<Text style={tailwind("text-red-600")}>*</Text>
          </Text>
          <TextInput
            // id
            required
            keyboardType="text"
            value={vaccination}
            onChangeText={setVaccination}
            placeholder="Enter your vaccination record"
          />
        </View>
      </View>
      {/* Button to submit the form to the db */}
      <TouchableOpacity
        style={tailwind(
          "absolute bottom-6 left-0 bg-indigo-700 rounded-full w-full h-10 items-center justify-center"
        )}
        onPress={() => {
          uploadToElderly();
        }}
      >
        <Text style={tailwind("font-bold text-white")}>Upload</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default AddElderly;
