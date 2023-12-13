import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";

export default function App() {
  console.log("PASSEI POR AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#66CDAA" barStyle="light-content" />
      <Routes />
    </NavigationContainer>
  );
}
