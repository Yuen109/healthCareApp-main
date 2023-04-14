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
  collection,
  doc,
  setDoc,
  addDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import useAuth from "../../hook/useAuth";

const AddChildren = () => {
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

  const [result, setResult] = useState([]);

  // Calculate BMI of the user
  useEffect(() => {
    const calBMI = (weight, height) => {
      const weightNum = parseFloat(weight);
      const heightNum = parseFloat(height);
      if (!isNaN(weightNum) && !isNaN(heightNum) && heightNum !== 0) {
        const result = weightNum / (heightNum * heightNum);
        setResult(result.toFixed(2));
      } else {
        setResult([]);
      }
      // const result = weight / (height * height);
      // setResult(parseFloat(result).toFixed(2));
    };
    calBMI(weight, height);
  }, [weight, height]);

  // Function to add children to the db
  const uploadToChildren = async () => {
    try {
      if (!name) return alert("Name field cannot be empty");
      // Age cannot be larger than 65 to be a child
      if (!age || age >= 65)
        return alert("Age field cannot be empty and cannot be grater than 65");
      if (!gender || (gender != "M" && gender != "F"))
        return alert("Gender field cannot be empty");
      if (!hobbies) return alert("Hobbies field cannot be empty");
      if (!weight) return alert("Weight field cannot be empty");
      if (!height) return alert("height field cannot be empty");
      if (!fat) return alert("Fat percentage field cannot be empty");
      if (!medicine) return alert("Medicine history field cannot be empty");
      if (!vaccination)
        return alert("Vaccination history field cannot be empty");
      // await setDoc(doc(db, "Children"), {
      await addDoc(collection(db, "Children"), {
        name: name,
        age: age,
        gender: gender,
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
      navigation.navigate("Children");
    } catch (error) {
      alert(error.message);
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
            placeholder="Enter your weight in kg"
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
            keyboardType="numeric"
            value={height}
            onChangeText={setheight}
            placeholder="Enter height in m"
          />
        </View>
        {/* Input Fat of the family member */}
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
          // "mt-44 bg-indigo-700 rounded-full w-full h-10 items-center justify-center"
        )}
        onPress={() => uploadToChildren()}
      >
        <Text style={tailwind("font-bold text-white")}>Upload</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default AddChildren;
