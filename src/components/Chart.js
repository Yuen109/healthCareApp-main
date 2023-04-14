import { View, Text, Dimensions } from "react-native";
import React from "react";
import { LineChart } from "react-native-chart-kit";

const Chart = ({ data }) => {
  // const Chart = ({ weights, heights, fatRates }) => {
  return (
    <View>
      <LineChart
        data={data}
        width={Dimensions.get("window").width}
        height={220}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default Chart;
