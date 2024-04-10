import { StyleSheet, Text } from "react-native";

import React from "react";
import { Stack } from "expo-router";
import { View } from "@/components/Themed";

const Page = () => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Stack.Screen options={{ title: "Page" }} />
      <Text>Page</Text>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
