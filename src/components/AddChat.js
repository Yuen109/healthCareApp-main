import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Button,
} from "react-native";
import { useState } from "react";
import React from "react";
import useAuth from "../../hook/useAuth";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebase/firebase";
import { collection, addDoc, arrayUnion } from "firebase/firestore";
import { useTailwind } from "tailwind-rn/dist";
// import { Button } from "@rneui/base";

const AddChat = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  const [roomName, setRoomName] = useState("");
  const [topic, setTopic] = useState("");

  const date = new Date();
  const { user } = useAuth();

  // Create a new chat room in the database
  const handleCreateChatRoom = async () => {
    try {
      if (!roomName) return alert("Room name cannot be empty");
      if (!topic) return alert("Topic cannot be empty");
      const chatRoomsCollection = collection(db, "chatRooms");

      await addDoc(chatRoomsCollection, {
        name: roomName,
        topic: topic,
        email: user.email,
        userId: user.uid,
        createdAt: date,
      });
      setRoomName("");
      setTopic("");
      navigation.goBack();
    } catch (error) {
      alert(error.message);
    }
    // return newChatRoomRef.id;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 90}
      style={tailwind("flex-1")}
    >
      {/* <View style={tailwind("h-full w-full")}> */}
      <View style={tailwind("mx-2 mt-4 mb-10")}>
        <Text style={tailwind("font-medium")}>Room Name:</Text>
        <TextInput
          value={roomName}
          onChangeText={setRoomName}
          placeholder="Enter a Room Name"
          style={tailwind("border rounded-md px-3 py-2")}
        />
      </View>
      <View style={tailwind("mx-2")}>
        <Text style={tailwind("font-medium")}>Start a new topic:</Text>
        <TextInput
          value={topic}
          onChangeText={setTopic}
          placeholder="Whats on your mind?"
          style={tailwind("border h-36 rounded-md px-3 py-2")}
          multiline={true}
          numberOfLines={4}
        />
      </View>
      <Button
        color="#0235A3"
        onPress={() => handleCreateChatRoom()}
        title="Create Chat Room"
        // buttonStyle={{
        //   backgroundColor: "#0235A3",
        //   borderRadius: 3,
        // }}
        // containerStyle={{
        //   width: 100,
        //   marginHorizontal: 10,
        //   marginVertical: 30,
        // }}
      />
    </KeyboardAvoidingView>
  );
};

export default AddChat;
