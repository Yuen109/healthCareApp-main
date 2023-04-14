import { View, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useTailwind } from "tailwind-rn/dist";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
dayjs.extend(relativeTime);

const ChatList = ({ chat }) => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  // console.log(chat.createdAt);

  return (
    <Pressable
      onPress={() => navigation.navigate("Chat", { chat })}
      style={tailwind("flex-row mx-2 my-2 h-16")}
    >
      <View style={tailwind("flex-1 border-b border-b-stone-300")}>
        <View style={tailwind("flex-row mb-2")}>
          {/* User name */}
          <Text
            style={tailwind("text-sky-700 flex-1 font-semibold")}
            numberOfLines={1}
          >
            {chat.name}
          </Text>
          {/* Send out time */}
          <Text style={tailwind("text-gray-500")}>
            {dayjs(chat.createdAt).fromNow()}
          </Text>
        </View>
        {/* Creator */}
        <Text style={tailwind("text-gray-500 ")} numberOfLines={2}>
          Created by: {chat.email}
          {/* Created by: {chat.creator[0].email} */}
        </Text>
        {/* Context */}
        <Text style={tailwind("text-gray-500 ")} numberOfLines={2}>
          Topic: {chat.topic}
        </Text>
      </View>
    </Pressable>
  );
};

export default ChatList;
