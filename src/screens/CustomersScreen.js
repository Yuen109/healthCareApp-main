import {
  View,
  Text,
  Button,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useTailwind } from "tailwind-rn/dist";
import { db } from "../../firebase/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  sum,
  orderBy,
} from "firebase/firestore";
import useAuth from "../../hook/useAuth";

const CustomersScreen = () => {
  const tailwind = useTailwind();
  const { user } = useAuth();

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [expenditures, setExpenditures] = useState([]);

  const addExpenditure = async () => {
    try {
      if (!description) return alert("Description cannot be empty");
      if (!amount) return alert("Amount be empty");
      const expenditure = {
        description: description,
        amount: Number(amount),
        userId: user.uid,
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

  useEffect(() => {
    const q = query(
      collection(db, "expenditures"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "asc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const amounts = querySnapshot.docs.map((doc) => doc.data().amount);
      const total = amounts.reduce((a, b) => a + b, 0);
      setTotalAmount(total);
      const expenditureList = querySnapshot.docs.map((doc) => doc.data());
      setExpenditures(expenditureList);
    });
    return () => {
      unsubscribe();
    };
  }, [user.uid]);

  return (
    <View style={tailwind("mx-2")}>
      <View style={tailwind("flex-row justify-between")}>
        <Text style={tailwind("text-lg text-sky-700")}>Description</Text>
        <Text style={tailwind("text-lg text-sky-700")}>Amount</Text>
      </View>
      {expenditures.length > 0 ? (
        <>
          <ScrollView>
            {expenditures.map((expenditure, index) => (
              <View
                key={expenditure.createdAt}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 10,
                }}
              >
                <Text>
                  {index + 1}. {expenditure.description}
                </Text>
                <Text>${expenditure.amount}</Text>
              </View>
            ))}
          </ScrollView>
          <Text style={tailwind("mb-4")}>Total Amount: ${totalAmount}</Text>
        </>
      ) : (
        <Text style={tailwind("my-4 flex-row items-center justify-center")}>
          Insert Description and Amount
        </Text>
      )}
      <TextInput
        style={tailwind("mb-4")}
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={tailwind("mb-4")}
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
