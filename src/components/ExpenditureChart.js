// import React, { useEffect, useState } from "react";
// import { View } from "react-native";
// import { useTailwind } from "tailwind-rn/dist";
// import { db } from "../../firebase/firebase";
// import {
//   collection,
//   query,
//   orderBy,
//   onSnapshot,
//   where,
// } from "firebase/firestore";
// import { PieChart } from "react-native-chart-kit";
// import useAuth from "../../hook/useAuth";

// const ExpenditureChart = () => {
//   const tailwind = useTailwind();

//   const { user } = useAuth();
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const q = query(
//       collection(db, "expenditures"),
//       where("userId", "==", user.uid),
//       orderBy("createdAt", "desc")
//     );
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const expenditures = [];
//       snapshot.forEach((doc) => {
//         expenditures.push(doc.data());
//       });
//       setData(expenditures);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   const chartData = Array.isArray(data)
//     ? data.reduce(
//         (acc, { description, amount }) => {
//           acc.labels.push(description);
//           acc.datasets[0].data.push(amount);
//           return acc;
//         },
//         { labels: [], datasets: [{ data: [] }] }
//       )
//     : { labels: [], datasets: [{ data: [] }] };

//   return (
//     <View style={tailwind("flex-1")}>
//       <PieChart
//         data={chartData}
//         width={400}
//         height={400}
//         chartConfig={{
//           backgroundColor: "#1cc910",
//           backgroundGradientFrom: "#eff3ff",
//           backgroundGradientTo: "#efefef",
//           decimalPlaces: 2,
//           color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//           labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//           style: {
//             borderRadius: 16,
//           },
//         }}
//         accessor="data"
//         backgroundColor="transparent"
//         paddingLeft="15"
//         absolute
//       />
//     </View>
//   );
// };

// export default ExpenditureChart;

// // import React, { useEffect, useState } from "react";
// // import { View, Text } from "react-native";
// // import { useTailwind } from "tailwind-rn/dist";
// // import { db } from "../../firebase/firebase";
// // import {
// //   collection,
// //   query,
// //   orderBy,
// //   onSnapshot,
// //   where,
// // } from "firebase/firestore";
// // import { PieChart } from "react-native-chart-kit";
// // import useAuth from "../../hook/useAuth";

// // const ExpenditureChart = () => {
// //   const tailwind = useTailwind();

// //   const { user } = useAuth();
// //   const [data, setData] = useState([]);

// //   useEffect(() => {
// //     const q = query(
// //       collection(db, "expenditures"),
// //       where("userId", "==", user.uid),
// //       orderBy("createdAt", "desc")
// //     );
// //     const unsubscribe = onSnapshot(q, (snapshot) => {
// //       const expenditures = [];
// //       snapshot.forEach((doc) => {
// //         expenditures.push(doc.data());
// //       });
// //       setData(expenditures);
// //     });

// //     return () => {
// //       unsubscribe();
// //     };
// //   }, []);

// //   const chartData = data.map(({ description, amount }) => ({
// //     key: description,
// //     value: amount,
// //     svg: { fill: "#1cc910" },
// //   }));

// //   console.log(chartData);

// //   return (
// //     <View style={tailwind("flex-1")}>
// //       {chartData.length > 0 ? (
// //         <PieChart
// //           data={chartData}
// //           width={400}
// //           height={400}
// //           labelRadius={50}
// //           labelStyle={{ fontSize: 16 }}
// //         />
// //       ) : (
// //         <Text>No data to display</Text>
// //       )}
// //     </View>
// //   );
// // };

// // export default ExpenditureChart;
