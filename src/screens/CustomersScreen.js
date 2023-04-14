import { View, Text, Button, ScrollView, TextInput } from "react-native";
import React, { useState } from "react";
import { useTailwind } from "tailwind-rn/dist";
import { db } from "../../firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const CustomersScreen = ({ navigation }) => {
  const tailwind = useTailwind();

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const addExpenditure = async () => {
    try {
      if (!description) return alert("Description cannot be empty");
      if (!amount) return alert("Amount be empty");
      const expenditure = {
        description: description,
        amount: Number(amount),
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, "expenditures"), expenditure);
      setDescription("");
      setAmount("");
      console.log("Expenditure added successfully!");
    } catch (error) {
      console.error("Error adding expenditure: ", error);
    }
  };
  return (
    <View>
      <Text>Description</Text>
      <TextInput
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
      />
      <Text>Amount</Text>
      <TextInput
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Button title="Add Expenditure" onPress={addExpenditure} />
    </View>
  );
};

export default CustomersScreen;
