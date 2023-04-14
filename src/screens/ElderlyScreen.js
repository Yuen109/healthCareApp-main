import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useTailwind } from "tailwind-rn/dist";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hook/useAuth";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import FamilyData from "../components/FamilyData";

const ElderlyScreen = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  const { user } = useAuth();

  const [elderlyData, setElderlyData] = useState([]);

  // To show elderly on the screen
  useEffect(() => {
    // Get elderly from db
    const q = query(
      collection(db, "Elderly"),
      where("parentId", "==", user.uid)
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let elderlyData = [];
      // Loop through the data and push to the elderlyData array
      QuerySnapshot.forEach((doc) => {
        elderlyData.push({ ...doc.data(), id: doc.id });
      });
      setElderlyData(elderlyData);
    });

    return () => unsubscribe;
  }, []);

  return (
    <View>
      <FlatList
        data={elderlyData}
        renderItem={({ item }) => <FamilyData data={item} />}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("AddElderly")}
        style={tailwind("m-2")}
      >
        {/* Button to add a new elderly */}
        <View style={tailwind("items-center")}>
          <View
            style={tailwind(
              "bg-[#8FBAF3] w-10 h-10 rounded-full items-center justify-center"
            )}
          >
            <Text style={tailwind("text-white")}>+</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ElderlyScreen;
