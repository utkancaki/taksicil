import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import SearchScreen from "./src/AppScreens/SearchScreen";
import ProfileScreen from "./src/AppScreens/ProfileScreen";
import SwipeScreen from "./src/AuthScreens/SwipeScreen";
import LoginScreen from "./src/AuthScreens/LoginScreen";
import RegisterScreen from "./src/AuthScreens/RegisterScreen";
import CommentingScreen from "./src/AppScreens/CommentingScreen";
import { UserContextProvider, useUserContext } from "./src/context/UserContext";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function User() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Search") {
            iconName = focused ? "search" : "search";
          } else if (route.name === "Comment") {
            iconName = focused ? "comment" : "comment-o";
          } else if (route.name === "Profile") {
            iconName = focused ? "user" : "user-o";
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#e3386a",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Comment" component={CommentingScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const Main = () => {
  const { user } = useUserContext();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user.email ? (
          <Stack.Screen
            name="User"
            component={User}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Swipe"
              component={SwipeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <UserContextProvider>
      <Main />
    </UserContextProvider>
  );
}
