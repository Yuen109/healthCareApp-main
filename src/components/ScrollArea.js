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
        description={`Parenting can be an overwhelming experience, especially for new parents who may feel lost and uncertain. However, with the help of technology, parents can connect with one another and support each other through the ups and downs of raising a child. This is where our platform comes in - it offers a space for parents to share their experiences, seek advice, and connect with professionals who can offer guidance and support. By bringing parents together, we hope to create a community where everyone feels heard, understood, and supported, no matter what challenges they may be facing.\n\nAs parents ourselves, we know firsthand the joys and struggles of raising a child. We believe that by sharing our stories and experiences, we can help others navigate the often-challenging world of parenthood. Our platform is designed to be a safe, inclusive space where everyone is welcome, regardless of their background, beliefs, or parenting style. We are committed to providing a supportive community where parents can learn from each other, grow together, and find the resources they need to raise happy, healthy children.`}
      />
      <ScrollCard
        img="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        title="Expert Advice"
        heading="Profession connections"
        description={`At our platform, we understand the importance of having access to reliable, accurate information when it comes to your health and wellbeing. That's why we partner with leading experts in various fields to bring you the latest research, advice, and insights. Whether you're looking for guidance on mental health, nutrition, exercise, or any other aspect of wellness, our platform offers a wealth of resources to help you live your best life.\n\nOur team of experts includes doctors, nutritionists, fitness trainers, and mental health professionals who are passionate about helping people achieve their goals. We believe that everyone deserves to feel their best, both physically and mentally, and we're committed to providing the tools and resources you need to achieve optimal health and wellbeing. Whether you're struggling with a specific health issue or simply want to improve your overall wellness, our platform offers a range of resources to help you on your journey.`}
      />
      <ScrollCard
        img="https://images.unsplash.com/photo-1563213126-a4273aed2016?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        title="Past Experience"
        heading="Real life experience"
        description={`Our platform has been designed to help people connect with others who have gone through similar experiences. We understand that life can be unpredictable and challenging at times, and that's why we believe in the power of community to provide support and comfort during difficult times. Our platform allows people to share their stories, connect with others who have been through similar situations, and find the support they need to move forward.\n\nBy sharing our experiences, we can help others feel less alone and more understood. Whether you're struggling with a health issue, going through a difficult time in your personal life, or simply need someone to talk to, our platform offers a supportive community where you can find the help you need. We believe that by coming together and supporting each other, we can make the world a better, more compassionate place.`}
      />
      <ScrollCard
        img="https://images.unsplash.com/photo-1523937986058-3643cb987697?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
        title="Policy"
        heading="Please follow the rules!"
        description={`At our platform, we take our policies seriously. We believe in creating a safe, inclusive, and respectful community for everyone who uses our platform. Our policies are designed to protect our users, prevent misinformation and abuse, and ensure that everyone feels welcome and valued. By following our policies, you can help us create a positive and supportive environment where everyone can thrive.\n\nWe ask all users to read and abide by our policies, which include guidelines on appropriate behavior, respectful communication, and responsible sharing of information. We believe that by treating each other with kindness, respect, and understanding, we can create a community where everyone feels valued and supported. If you have any questions or concerns about our policies, please do not hesitate to reach out to our team - we're always here to help.`}
      />
    </ScrollView>
  );
};

export default ScrollArea;
