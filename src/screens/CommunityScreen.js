import { Text, FlatList, TextInput, View } from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import { useTailwind } from "tailwind-rn/dist";
import { db } from "../../firebase/firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  arrayUnion,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import ChatList from "../components/ChatList";
import useAuth from "../../hook/useAuth";

const CommunityScreen = () => {
  const tailwind = useTailwind();
  const [chatRooms, setChatRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const chatRoomsCollection = collection(db, "chatRooms");

    let q = query(chatRoomsCollection, orderBy("createdAt", "desc"));

    if (searchQuery !== "") {
      q = query(
        chatRoomsCollection,
        where("name", ">=", searchQuery),
        where("name", "<=", searchQuery + "\uf8ff"),
        orderBy("name", "desc")
      );
    }

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let rooms = [];
      querySnapshot.forEach((doc) => {
        rooms.push({ ...doc.data(), id: doc.id });
      });
      setChatRooms(rooms);
    });
    return () => unsubscribe();
  }, [user.uid, searchQuery]);

  // console.log(chatRooms);

  return (
    <>
      <View style={tailwind("bg-white px-4 py-2")}>
        <TextInput
          placeholder="Search Chat Rooms"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={tailwind("border border-gray-400 px-2 py-1 rounded")}
        />
      </View>
      {chatRooms.length > 0 ? (
        <FlatList
          data={chatRooms}
          renderItem={({ item }) => <ChatList chat={item} />}
        />
      ) : (
        <Text style={tailwind("bg-white h-full p-2")}>No chat rooms found</Text>
      )}
    </>
  );
};

export default CommunityScreen;
