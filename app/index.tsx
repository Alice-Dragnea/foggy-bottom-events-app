import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SwipeableCard from "../components/SwipeableCard";
import { EVENTS, Event } from "../constants/Events";

const categories = ["All", "sports", "concerts", "campus"];
const screenWidth = Dimensions.get("window").width;

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [eventsStack, setEventsStack] = useState<Event[]>(
    [...EVENTS].reverse()
  );

  const filteredEvents = eventsStack.filter(
    (e) => selectedCategory === "All" || e.category === selectedCategory
  );

  const handleSwipeRight = (event: Event) => removeTopEvent();
  const handleSwipeLeft = (event: Event) => removeTopEvent();

  const removeTopEvent = () =>
    setEventsStack((prev) => prev.slice(0, prev.length - 1));

  return (
    <SafeAreaView style={styles.container}>
      {/* Category Tabs */}
      <View style={styles.categoryContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryButton,
              selectedCategory === cat && styles.categorySelected,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat && styles.categoryTextSelected,
              ]}
            >
              {cat.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Swipeable Cards */}
      <View style={styles.swiperContainer}>
        {filteredEvents.length === 0 ? (
          <Text style={styles.noEventsText}>No events to show</Text>
        ) : (
          filteredEvents.map((event) => (
            <SwipeableCard
              key={event.id}
              event={event}
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
            />
          ))
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  categoryButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  categorySelected: { backgroundColor: "#FF6347" },
  categoryText: { fontSize: 14, color: "#555", fontWeight: "bold" },
  categoryTextSelected: { color: "white" },
  swiperContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  noEventsText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 50,
  },
});
