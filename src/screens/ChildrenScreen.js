import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
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
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const childrenCollection = collection(db, "Children");

    let q = query(childrenCollection, where("parentId", "==", user.uid));

    if (searchQuery !== "") {
      q = query(
        childrenCollection,
        where("name", ">=", searchQuery),
        where("name", "<=", searchQuery + "\uf8ff"),
        where("parentId", "==", user.uid)
      );
    }

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let children = [];
      querySnapshot.forEach((doc) => {
        children.push({ ...doc.data(), id: doc.id });
      });
      setChildData(children);
    });
    return () => unsubscribe();
  }, [user.uid, searchQuery]);

  // console.log(childData);

  return (
    <View>
      <View style={tailwind("bg-white px-4 py-2")}>
        <TextInput
          placeholder="Search Children"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={tailwind("border border-gray-400 px-2 py-1 rounded")}
        />
      </View>
      {childData.length > 0 ? (
        <FlatList
          data={childData}
          renderItem={({ item }) => <FamilyData data={item} />}
        />
      ) : (
        <Text style={tailwind("bg-white h-full p-2")}>No children found</Text>
      )}
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
