import { LinearGradient } from "expo-linear-gradient";
import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  StyleSheet,
  Text,
} from "react-native";
import { Event } from "../constants/Events";

const screenWidth = Dimensions.get("window").width;

type Props = {
  event: Event;
  onSwipeRight: (event: Event) => void;
  onSwipeLeft: (event: Event) => void;
};

export default function SwipeableCard({
  event,
  onSwipeRight,
  onSwipeLeft,
}: Props) {
  const position = useRef(new Animated.ValueXY()).current;

  // show feedback only after threshold
  const likeOpacity = position.x.interpolate({
    inputRange: [120, screenWidth],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  const rejectOpacity = position.x.interpolate({
    inputRange: [-screenWidth, -120],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: position.x, dy: position.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 120) {
          Animated.timing(position, {
            toValue: { x: screenWidth + 100, y: gesture.dy },
            duration: 200,
            useNativeDriver: false,
          }).start(() => onSwipeRight(event));
        } else if (gesture.dx < -120) {
          Animated.timing(position, {
            toValue: { x: -screenWidth - 100, y: gesture.dy },
            duration: 200,
            useNativeDriver: false,
          }).start(() => onSwipeLeft(event));
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[position.getLayout(), styles.card]}
    >
      {/* Feedback */}
      <Animated.View
        style={[styles.feedbackContainer, { opacity: likeOpacity }]}
      >
        <LinearGradient
          colors={["rgba(0,255,0,0.6)", "rgba(0,255,0,0.3)"]}
          style={styles.feedbackBg}
        >
          <Text style={styles.feedbackText}>✅</Text>
        </LinearGradient>
      </Animated.View>
      <Animated.View
        style={[styles.feedbackContainer, { opacity: rejectOpacity }]}
      >
        <LinearGradient
          colors={["rgba(255,0,0,0.6)", "rgba(255,0,0,0.3)"]}
          style={styles.feedbackBg}
        >
          <Text style={styles.feedbackText}>❌</Text>
        </LinearGradient>
      </Animated.View>

      {/* Card content */}
      <Image source={{ uri: event.image }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{event.title}</Text>
      <Text style={styles.cardDesc}>{event.description}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: screenWidth - 40,
    height: 400,
    borderRadius: 15,
    backgroundColor: "white",
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  cardImage: { width: "100%", height: 200, borderRadius: 10, marginBottom: 10 },
  cardTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
  cardDesc: { fontSize: 14, color: "#555" },

  feedbackContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
    borderRadius: 15,
  },
  feedbackBg: {
    width: "60%",
    height: "60%",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  feedbackText: { fontSize: 80, fontWeight: "bold", color: "white" },
});
