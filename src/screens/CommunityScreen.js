import { Text, FlatList } from "react-native";
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
  const { user } = useAuth();

  useEffect(() => {
    const chatRoomsCollection = collection(db, "chatRooms");

    const q = query(
      chatRoomsCollection,
      // where("userId", "==", user.uid),
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
          renderItem={({ item }) => <ChatList chat={item} />}
        />
      ) : (
        <Text style={tailwind("bg-white h-full p-2")}>No chat rooms found</Text>
      )}
    </>
  );
};

export default CommunityScreen;
