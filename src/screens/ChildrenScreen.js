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

const ChildrenScreen = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  const { user } = useAuth();

  const [childData, setChildData] = useState([]);
  // console.log("Child Data:", childData);

  // To show children in the screen
  useEffect(() => {
    // Get children from db
    const q = query(
      collection(db, "Children"),
      where("parentId", "==", user.uid)
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let childData = [];
      // Loop through the data and push to the childData array
      QuerySnapshot.forEach((doc) => {
        childData.push({ ...doc.data(), id: doc.id });
      });
      setChildData(childData);
    });
    return () => unsubscribe;
  }, []);

  // console.log(childData);

  return (
    <View>
      <FlatList
        data={childData}
        renderItem={({ item }) => <FamilyData data={item} />}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("AddChildren")}
        style={tailwind("m-2")}
      >
        {/* Button to add a new children */}
        <View style={tailwind("items-center justify-center")}>
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

export default ChildrenScreen;
