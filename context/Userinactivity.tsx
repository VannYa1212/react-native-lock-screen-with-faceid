import { AppState, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { MMKV } from "react-native-mmkv";
import { useRouter } from "expo-router";

const storage = new MMKV({
  id: "userinactivity",
});

const TIME_LOCK = 2000; // 2 seconds

const UserinactivityProvidr = ({ children }: any) => {
  const appState = React.useRef(AppState.currentState);
  const router = useRouter();

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = (nextAppState: any) => {
    if (nextAppState === "inactive") {
      router.push("/(model)/White");
    } else {
      if (router.canGoBack()) {
        router.back();
      }
    }
    if (nextAppState === "background") {
      recordTime();
    } else if (
      nextAppState === "active" &&
      appState.current.match(/background/)
    ) {
      const elapsed = Date.now() - (storage.getNumber("time") || 0);
      if (elapsed >= TIME_LOCK) {
        router.push("/(model)/LockScreen");
      }
    } 

    appState.current = nextAppState;
  };
  const recordTime = () => {
    storage.set("time", Date.now());
    console.log('====================================');
    console.log('recordTime' , Date.now());
    console.log('====================================');
  };
  
  return <>{children}</>;
};

export default UserinactivityProvidr;

