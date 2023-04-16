import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useTailwind } from "tailwind-rn/dist";
import { useRoute, useNavigation } from "@react-navigation/native";
import Message from "../components/Message";
import useAuth from "../../hook/useAuth";
import InputBox from "../components/InputBox";
import { db } from "../../firebase/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";

const ChatScreen = () => {
  const tailwind = useTailwind();

  const { user } = useAuth();

  const route = useRoute();
  const navigation = useNavigation();

  const roomData = route.params.chat;
  const isCreator = user.uid === roomData.userId;

  useLayoutEffect(() => {
    if (isCreator) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity style={{ marginRight: 5 }} onPress={handleDelete}>
            <Ionicons name="trash-bin" size={24} color="black" />
          </TouchableOpacity>
        ),
      });
    }
  }, [navigation, isCreator]);

  useEffect(() => {
    navigation.setOptions({ title: route.params.chat.name });
  }, [route.params.chat.name]);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Get children from db
    const q = query(
      collection(db, "messages"),
      where("roomId", "==", route.params.chat.id),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let messages = [];
      // Loop through the data and push to the childData array
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe;
  }, [route.params.chat.id]);

  // const handleLike = async (chatRoomsId) => {
  //   try {
  //     const newLike = await addDoc(collection(db, "likedChatRoom"), {
  //       userId: user.uid, // replace with actual user ID
  //       chatRoomsId,
  //       createdAt: serverTimestamp(),
  //     });
  //     console.log("Like added with ID: ", newLike.id);
  //   } catch (error) {
  //     console.error("Error adding like: ", error);
  //   }
  // };

  const handleDelete = async () => {
    Alert.alert(
      "Delete Chat Room",
      "Are you sure you want to delete this chat room and all its messages?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              // Delete all messages in the chat room
              const messagesRef = collection(db, "messages");
              const q = query(
                messagesRef,
                where("roomId", "==", route.params.chat.id)
              );
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
                deleteDoc(doc.ref);
              });

              // Delete the chat room
              const chatRoomRef = doc(db, "chatRooms", route.params.chat.id);
              await deleteDoc(chatRoomRef);
              navigation.goBack();
              console.log("Chat room and messages deleted successfully!");
            } catch (error) {
              console.error("Error deleting chat room and messages: ", error);
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 90}
      style={tailwind("flex-1")}
    >
      <FlatList
        data={messages}
        renderItem={({ item }) => <Message message={item} />}
        inverted
        style={tailwind("p-2 bg-blue-200")}
      />
      <InputBox roomId={route.params.chat.id} />
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
