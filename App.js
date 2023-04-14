// This is a helathcare community application for parents
// Main features: Community, Record of children & elderly
// Author: Anson Yuen
// Start date: 22/11/2022

import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigator/RootNavigator";
import { AuthProvider } from "./hook/useAuth";

export default function App() {
  return (
    <TailwindProvider utilities={utilities}>
      <NavigationContainer>
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </NavigationContainer>
    </TailwindProvider>
  );
}
