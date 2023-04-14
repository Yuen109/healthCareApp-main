import { TextInput } from "react-native";
import React from "react";
import useAuth from "../../hook/useAuth";
import { useTailwind } from "tailwind-rn/dist";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../firebase/firebase";
import {
  updateDoc,
  doc,
  collection,
  addDoc,
  arrayUnion,
  setDoc,
} from "firebase/firestore";

const InputBox = ({ roomId }) => {
  const { user } = useAuth();

  const tailwind = useTailwind();
  const [message, setMessage] = useState("");

  const date = new Date();

  // Send out messages
  const onSend = async () => {
    try {
      if (!message) return alert("Message cannot be empty");

      const messageCollection = collection(db, "messages");
      const newMessageRef = doc(messageCollection);
      const newMessage = {
        roomId: roomId,
        members: [user.uid],
        messages: [
          {
            user: user.email,
            text: message,
            createdAt: date,
          },
        ],
        createdAt: date,
      };
      await setDoc(newMessageRef, newMessage);

      setMessage("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={tailwind("flex flex-row bg-blue-200 items-center justify-center")}
    >
      {/* Text input  */}
      <TextInput
        placeholder="Type your message..."
        value={message}
        onChangeText={setMessage}
        style={tailwind(
          "flex-1 bg-white p-2 mx-3 mb-2 mt-2 border border-gray-500 rounded-xl"
        )}
      />
      {/* Send icon */}
      <MaterialIcons
        onPress={() => onSend()}
        name="send"
        size={24}
        color="black"
        style={tailwind("mr-3")}
      />
    </SafeAreaView>
  );
};

export default InputBox;
