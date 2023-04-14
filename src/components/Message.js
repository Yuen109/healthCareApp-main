import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect } from "react";
import { useTailwind } from "tailwind-rn/dist";
import useAuth from "../../hook/useAuth";
import relativeTime from "dayjs/plugin/relativeTime";
import { db } from "../../firebase/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import dayjs from "dayjs";
dayjs.extend(relativeTime);

const Message = ({ message }) => {
  const Tailwind = useTailwind();
  const { user } = useAuth();

  const isMyMessage = message.messages[0].user === user.email;

  const handleDelete = async () => {
    Alert.alert(
      "Delete Chat Message",
      "Are you sure you want to delete this message?",
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
              const messageRef = doc(db, "messages", message.id);
              await deleteDoc(messageRef);
              console.log("Message deleted successfully!");
            } catch (error) {
              console.error("Error deleting message: ", error);
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    // <View style={Tailwind("bg-white m-1 p-3 rounded-lg")}>
    <View
      // style={Tailwind(
      //   `${isMyMessage ? "bg-indigo-300 " : "bg-white"} m-1 p-3 rounded-lg`
      // )}
      style={Tailwind("bg-white m-1 p-3 rounded-lg")}
    >
      <View style={Tailwind("flex-row justify-between")}>
        {/* <Text style={Tailwind("text-sm text-sky-700 mb-1")}> */}
        {/* User name */}
        <Text
          style={Tailwind(
            `${isMyMessage ? "text-sky-700" : "text-indigo-300"} text-sm
            mb-1`
          )}
        >
          {message.messages[0].user}
        </Text>
        {message.messages[0].user === user.email && (
          <TouchableOpacity onPress={handleDelete}>
            <Text style={Tailwind("text-red-500 ml-2")}>Delete</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* Context */}
      <Text style={Tailwind("text-gray-500")}>{message.messages[0].text}</Text>
      <Text>{message.creator}</Text>
      {/* Time */}
      <Text style={Tailwind("text-gray-500 self-end")}>
        {dayjs(message.messages.createdAt).fromNow(true)}
      </Text>
    </View>
  );
};

export default Message;
