import { View, Text, ScrollView, Dimensions } from "react-native";
import { useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { useTailwind } from "tailwind-rn/dist";
import {
  collection,
  doc,
  getDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Chart from "../components/Chart";

const HealthDetail = () => {
  const route = useRoute();
  const tailwind = useTailwind();

  const [data, setData] = useState([]);
  const [parsedData, setParsedData] = useState([]);
  const [weights, setWeights] = useState([]);
  const [heights, setHeights] = useState([]);
  const [fatRates, setFatRates] = useState([]);
  const [bmi, setBmi] = useState([]);

  const childrenRef = doc(db, "Children", route.params.id);
  const elderlyRef = doc(db, "Elderly", route.params.id);

  useEffect(() => {
    getDoc(childrenRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        setData({
          id: docSnapshot.id,
          ...docSnapshot.data(),
        });
      } else {
        setData([]);
      }
    });
  }, [route.params.id]);

  useEffect(() => {
    getDoc(elderlyRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        setData({
          id: docSnapshot.id,
          ...docSnapshot.data(),
        });
      } else {
        setData([]);
      }
    });
  }, [route.params.id]);

  useEffect(() => {
    // map bodyComposition array according to fatRate, height and weight
    const mappedData = parsedData.bodyComposition?.map((item) => ({
      fatRate: item.fatRate,
      height: item.height,
      weight: item.weight,
      bmi: item.BMI,
    }));

    // 2
    const newWeights = [];
    const newHeights = [];
    const newFatRates = [];
    const newBMI = [];

    if (mappedData) {
      newWeights.push(mappedData.map((item) => item.weight));
      newHeights.push(mappedData.map((item) => item.height));
      newFatRates.push(mappedData.map((item) => item.fatRate));
      newBMI.push(mappedData.map((item) => item.bmi));

      setWeights(newWeights);
      setHeights(newHeights);
      setFatRates(newFatRates);
      setBmi(newBMI);
      // 1
      // setWeights(mappedData.map((item) => item.weight));
      // setHeights(mappedData.map((item) => item.height));
      // setFatRates(mappedData.map((item) => item.fatRate));
    }
  }, [parsedData]);

  useEffect(() => {
    setParsedData(JSON.parse(JSON.stringify(data)));
  }, [data]);

  // console.log(
  //   "weight: " + weights,
  //   "height: " + heights,
  //   "fat Rate: " + fatRates,
  //   "BMI:" + bmi
  // );

  const weightData = {
    // labels: weights.map((_, i) => `${i + 1}`),
    datasets: [
      {
        label: "Weight",
        // data: weights,
        data: [60, 62, 59, 10],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const heightData = {
    // labels: heights.map((_, i) => `${i + 1}`),
    datasets: [
      {
        label: "Height",
        // data: heights,
        data: [1.72, 1.72, 1.72, 1.73],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const fatRateData = {
    // labels: fatRates.map((_, i) => `${i + 1}`),
    datasets: [
      {
        label: "Fat Rate",
        // data: fatRates,
        data: [22, 23, 22, 21],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const bmiData = {
    // labels: bmi.map((_, i) => `${i + 1}`),
    datasets: [
      {
        label: "BMI",
        // data: bmi,
        data: [22, 23, 22, 21],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <ScrollView style={tailwind("bg-white")}>
      <Text style={tailwind("text-xl")}>Body Composition</Text>
      <View>
        <Text style={tailwind("text-lg")}>BMI Chart</Text>
        {/* <Text>{route.params.result}</Text> */}
        {/* <Text>{bmi}</Text> */}
        <Chart data={bmiData} />
      </View>
      <View>
        <Text style={tailwind("text-lg")}>Weight Chart</Text>
        {/* <Text>{route.params.weight}</Text> */}
        {/* <Text>{weights}</Text> */}
        <Chart data={weightData} />
      </View>
      <View>
        <Text style={tailwind("text-lg")}>Height Chart</Text>
        {/* <Text>{route.params.height}</Text> */}
        {/* <Text>{heights}</Text> */}
        <Chart data={heightData} />
      </View>
      <View>
        <Text style={tailwind("text-lg")}>Fat Rate Chart</Text>
        {/* <Text>{route.params.fatRate}</Text> */}
        {/* <Text>{fatRates}</Text> */}
        <Chart data={fatRateData} />
      </View>
    </ScrollView>
  );
};

export default HealthDetail;
