import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  useWindowDimensions,
} from "react-native";

import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import * as LocalAuthentication from "expo-local-authentication";

const LockScreen = () => {
  const { width, height } = useWindowDimensions();
  const [code, setCode] = useState<number[]>([]);
  const codeLength = Array(4).fill(0); // [0,0,0,0]
  const offset = useSharedValue(0);

  const stylePin = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  const TIME = 80;
  const OFFSET = 20;

  useEffect(() => {
    if (code.length === 4) {
      console.log("code", code);
      if (code.join("") === "1234") {
        console.log("Login success");
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setCode([]);
      } else {
        console.log("Login failed");
        // Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

        offset.value = withSequence(
          withTiming(-OFFSET, { duration: TIME }),
          withRepeat(withTiming(OFFSET, { duration: TIME }), 5, true),
          withTiming(0, { duration: TIME / 2 })
        );

        setCode([]);
      }
    }
  }, [code]);

  const onNumberPress = (number: number) => {
    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (code.length === 4) {
      return;
    }
    setCode((prev) => [...prev, number]);
  };

  const onFingerPrintPress = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    console.log("onFingerPrintPress");
    const { success } = await LocalAuthentication.authenticateAsync();
    if (success) {
      console.log("Login success");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      console.log("Login failed");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const onDeletePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCode((prev) => prev.slice(0, -1));
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/bg-blur.png")}
        style={{
          width,
          height,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          resizeMode: "cover",
        }}
        blurRadius={90}
      />
      <SafeAreaView
        style={{
          flex: 1,
          padding: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 26,
          }}
        >
          <Image
            source={require("@/assets/images/logo.png")}
            style={{
              width: wp(63),
              height: wp(16),
            }}
          />
        </View>
        <View>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              textAlign: "center",
              marginTop: 20,
            }}
          >
            Enter your PIN
          </Text>
          <Animated.View
            style={[
              {
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 20,
                gap: 10,
              },
              stylePin,
            ]}
          >
            {codeLength.map((_, index) => (
              <BlurView
                intensity={40}
                tint="light"
                key={index}
                style={{
                  width: wp(10),
                  height: wp(10),
                  borderRadius: 20,
                  backgroundColor: "rgba(255,255,255,0.3)",
                  marginHorizontal: 10,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                  borderColor: "rgba(115, 0, 205, 0.53)",
                  borderWidth: 1,
                }}
              >
                <View
                  style={{
                    width: wp(8),
                    height: wp(8),
                    borderRadius: 20,
                    backgroundColor: code[index] ? "#fff" : "transparent",
                  }}
                />
              </BlurView>
            ))}
          </Animated.View>
        </View>
        {/* enter number button */}
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
              gap: 32,
            }}
          >
            {[1, 2, 3].map((number) => (
              <TouchableHighlight
                key={number}
                onPress={() => {
                  onNumberPress(number);
                }}
                underlayColor="rgba(255,255,255,0.5)"
                style={styles.tuchableHighlightStyle}
              >
                <BlurView
                  intensity={40}
                  tint="light"
                  style={styles.buttonStyle}
                >
                  <Text
                    style={{ color: "#fff", fontSize: 24, fontWeight: "600" }}
                  >
                    {number}
                  </Text>
                </BlurView>
              </TouchableHighlight>
            ))}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 32,
              gap: 32,
            }}
          >
            {[4, 5, 6].map((number) => (
              <TouchableHighlight
                key={number}
                onPress={() => {
                  onNumberPress(number);
                }}
                underlayColor="rgba(255,255,255,0.5)"
                style={styles.tuchableHighlightStyle}
              >
                <BlurView
                  intensity={40}
                  tint="light"
                  style={styles.buttonStyle}
                >
                  <Text
                    style={{ color: "#fff", fontSize: 24, fontWeight: "600" }}
                  >
                    {number}
                  </Text>
                </BlurView>
              </TouchableHighlight>
            ))}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 32,
              gap: 32,
            }}
          >
            {[7, 8, 9].map((number) => (
              <TouchableHighlight
                key={number}
                onPress={() => {
                  onNumberPress(number);
                }}
                underlayColor="rgba(255,255,255,0.5)"
                style={styles.tuchableHighlightStyle}
              >
                <BlurView
                  intensity={40}
                  tint="light"
                  style={styles.buttonStyle}
                >
                  <Text
                    style={{ color: "#fff", fontSize: 24, fontWeight: "600" }}
                  >
                    {number}
                  </Text>
                </BlurView>
              </TouchableHighlight>
            ))}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 32,
              gap: 32,
            }}
          >
            <Pressable
              onPress={() => {
                onFingerPrintPress();
              }}
              style={styles.tuchableHighlightStyle}
            >
              <Image
                source={require("@/assets/images/fingerprint.png")}
                style={{
                  width: wp(10),
                  height: wp(10),
                }}
              />
            </Pressable>
            <TouchableHighlight
              onPress={() => {
                onNumberPress(0);
              }}
              underlayColor="rgba(255,255,255,0.5)"
              style={styles.tuchableHighlightStyle}
            >
              <BlurView intensity={40} tint="light" style={styles.buttonStyle}>
                <Text
                  style={{ color: "#fff", fontSize: 24, fontWeight: "600" }}
                >
                  0
                </Text>
              </BlurView>
            </TouchableHighlight>
            <Pressable
              onPress={() => {
                onDeletePress();
              }}
              style={styles.tuchableHighlightStyle}
            >
              <Image
                source={require("@/assets/images/delete.png")}
                style={{
                  width: wp(10),
                  height: wp(10),
                }}
              />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default LockScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonStyle: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(20) / 2,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
  },
  tuchableHighlightStyle: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(20) / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
