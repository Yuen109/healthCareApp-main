import { View, Text, ScrollView } from "react-native";
import React from "react";

import ScrollCard from "./ScrollCard";

const ScrollArea = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 10,
        paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <ScrollCard
        img="https://images.unsplash.com/photo-1491295314828-fb03946d9b52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        title="Parent Information"
        heading="Parent must Know"
        discription="This is a platform that allow parents to connect each others, parent together can become stronger
        , browsing for advice and seeking for help with professional."
      />
      <ScrollCard
        img="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        title="Expert Advice"
        heading="Profession connections"
        discription="Get vaccinated as soon as possible. Keep youself and the environment clean and tidy. If you feel 
        unwell go to see the doctors or seek help from others."
      />
      <ScrollCard
        img="https://images.unsplash.com/photo-1563213126-a4273aed2016?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        title="Past Experience"
        heading="Real life experience"
        discription="May, This application help me a lot, especially mental health, I'm feeling very unwell during
        the thme when my kid get sick, I'm afraid and lost, I don't know what to do and what can do, I don't wish he can 
        get well soon."
      />
      <ScrollCard
        img="https://images.unsplash.com/photo-1523937986058-3643cb987697?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
        title="Policy"
        heading="Please follow the rules!"
        discription="Make sure every one read this before using the app, try to be polite and frendly to the users in this application,
        don not spread missleading information to others."
      />
    </ScrollView>
  );
};

export default ScrollArea;
