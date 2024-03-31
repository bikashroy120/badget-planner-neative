import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="add-category"
        options={{
          headerShown: true,
          presentation: "modal",
          headerTitle: "Add New Category",
        }}
      />
    </Stack>
  );
};

export default Layout;

const styles = StyleSheet.create({});
