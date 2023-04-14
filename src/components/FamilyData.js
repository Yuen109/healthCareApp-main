import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import { useTailwind } from "tailwind-rn/dist";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import UpdateInfo from "./UpdateInfo";

const FamilyData = ({
  // id,
  // createdAt,
  // parentId,
  // hobbies,
  // gender,
  // name,
  // bodyComposition,
  // age,
  // medicine,
  // vaccination,
  data,
}) => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  const childrenRef = doc(db, "Children", data.id);
  const elderlyRef = doc(db, "Elderly", data.id);

  // Delete document in children
  const deleteChildren = async () => {
    await deleteDoc(childrenRef);
  };

  // Delete document in elderly
  const deleteElderly = async () => {
    await deleteDoc(elderlyRef);
  };

  // console.log(data.bodyComposition);

  return (
    <View
      style={tailwind(
        "flex-row h-20 mx-2 border-b border-b-stone-300 items-center justify-center"
      )}
    >
      <Pressable
        onPress={
          () => navigation.navigate("Family Detail", { data })
          // navigation.navigate("Family Detail", { id: data.id, name: data.name })
        }
        style={tailwind("flex-1")}
      >
        <View style={tailwind("flex-row")}>
          <Text style={tailwind("flex-1 text-lg text-sky-700")}>
            {data.name}
          </Text>
          {data.age ? (
            <Text style={tailwind("text-sm pr-4")}>{data.age}</Text>
          ) : (
            <Text>NO DATA</Text>
          )}
        </View>
        <Text style={tailwind("pt-2")}>{data.gender}</Text>
      </Pressable>
      <View style={tailwind("flex justify-between")}>
        {/* Delete button */}
        <MaterialIcons
          name="delete"
          size={24}
          color="black"
          onPress={() => {
            deleteChildren();
            deleteElderly();
          }}
        />
        {/* Edit button */}
        <MaterialIcons
          name="edit"
          size={24}
          color="black"
          onPress={() => navigation.navigate("Update Info", { data })}
        />
      </View>
    </View>
  );
};

export default FamilyData;
