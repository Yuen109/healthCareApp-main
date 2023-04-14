import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import ChatScreen from "../src/screens/ChatScreen";
import Registration from "../src/screens/RegistrationScreen";
import Login from "../src/screens/LoginScreen";
import useAuth from "../hook/useAuth";
import AddChat from "../src/components/AddChat";
import Dashboard from "../src/screens/DashboardScreen";
import ScrollCardDescriptionScreen from "../src/screens/ScrollCardDescriptionScreen";
import ChildrenScreen from "../src/screens/ChildrenScreen";
import ElderlyScreen from "../src/screens/ElderlyScreen";
import Feature from "../src/components/Feature";
import AddChildren from "../src/components/AddChildren";
import AddElderly from "../src/components/AddElderly";
import FamilyDetail from "../src/components/FamilyDetail";
import FamilyDetailBox from "../src/components/FamilyDetailBox";
import HealthDetail from "../src/components/HealthDetail";
import MedicialDetail from "../src/components/MedicialDetail";
import UpdateInfo from "../src/components/UpdateInfo";
import InsertData from "../src/components/InsertData";
import HobbiesDetail from "../src/components/HobbiesDetail";
import VaccinationDetail from "../src/components/VaccinationDetail";
import SupportScreen from "../src/screens/SupportScreen";
import ProfileScreen from "../src/screens/ProfileScreen";
import AboutScreen from "../src/screens/AboutScreen";

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  const { user } = useAuth();

  return (
    <RootStack.Navigator>
      {user ? (
        <>
          <RootStack.Group>
            <RootStack.Screen name="Main" component={TabNavigator} />
            <RootStack.Screen name="Chat" component={ChatScreen} />
            <RootStack.Screen name="Create New Topic" component={AddChat} />
            {/* <RootStack.Screen  name='Dashboard' component={Dashboard} /> */}
            <RootStack.Screen
              name="Description"
              component={ScrollCardDescriptionScreen}
            />
            <RootStack.Screen name="Feature" component={Feature} />
            <RootStack.Screen name="Children" component={ChildrenScreen} />
            <RootStack.Screen name="Elderly" component={ElderlyScreen} />
            <RootStack.Screen name="AddChildren" component={AddChildren} />
            <RootStack.Screen name="AddElderly" component={AddElderly} />
            <RootStack.Screen name="Family Detail" component={FamilyDetail} />
            <RootStack.Screen name="Health Detail" component={HealthDetail} />
            <RootStack.Screen name="Update Info" component={UpdateInfo} />
            <RootStack.Screen name="Insert Info" component={InsertData} />
            <RootStack.Screen name="Hobbies Detail" component={HobbiesDetail} />
            <RootStack.Screen
              name="Vaccination Detail"
              component={VaccinationDetail}
            />
            <RootStack.Screen
              name="Medical Detail"
              component={MedicialDetail}
            />
            <RootStack.Screen
              name="Family Detail Box"
              component={FamilyDetailBox}
            />
            <RootStack.Screen name="Support Screen" component={SupportScreen} />
            <RootStack.Screen name="Profile Screen" component={ProfileScreen} />
            <RootStack.Screen name="About Screen" component={AboutScreen} />
          </RootStack.Group>
        </>
      ) : (
        <>
          <RootStack.Group>
            <RootStack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <RootStack.Screen
              name="Registration"
              component={Registration}
              options={{ headerShown: false }}
            />
          </RootStack.Group>
        </>
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
