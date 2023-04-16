import { View, Text, FlatList, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { useTailwind } from "tailwind-rn/dist";
import { db } from "../../firebase/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import ChatList from "./ChatList";
import FeatureMassage from "./FeatureMassage";
import useAuth from "../../hook/useAuth";

const FeatureBoard = () => {
  const tailwind = useTailwind();

  const { user } = useAuth();

  const [chatRooms, setChatRooms] = useState([]);

  // Display the chatRoom which is created by the current usr
  useEffect(() => {
    const chatRoomsCollection = collection(db, "chatRooms");

    const q = query(
      chatRoomsCollection,
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let rooms = [];
      querySnapshot.forEach((doc) => {
        rooms.push({ ...doc.data(), id: doc.id });
      });
      setChatRooms(rooms);
    });
    return () => unsubscribe;
  }, [user.uid]);

  // console.log(chatRooms);

  return (
    <>
      {chatRooms.length > 0 ? (
        <FlatList
          data={chatRooms}
          // keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ChatList chat={item} />}
          style={tailwind("bg-white mx-2 h-full rounded-lg p-2")}
        />
      ) : (
        <Text style={tailwind("mx-2")}>No chat rooms found</Text>
      )}
    </>
  );
};

export default FeatureBoard;
