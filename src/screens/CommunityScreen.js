import { Text, FlatList } from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import { useTailwind } from "tailwind-rn/dist";
import { db } from "../../firebase/firebase";
import { collection, onSnapshot, addDoc, arrayUnion } from "firebase/firestore";
import ChatList from "../components/ChatList";
import chats from "../../assets/data/chats.json";

const CommunityScreen = () => {
  const tailwind = useTailwind();
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "chatRooms"), (snapshot) => {
      const rooms = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setChatRooms(rooms);
    });

    return () => unsubscribe();
  }, []);

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
