import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SwipeableCard from "../components/SwipeableCard";
import { EVENTS, Event } from "../constants/Events";

const categories = ["All", "sports", "concerts", "campus"];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [savedEvents, setSavedEvents] = useState<Event[]>([]);
  const [eventsStack, setEventsStack] = useState<Event[]>(
    [...EVENTS].reverse()
  );

  const filteredEvents = eventsStack.filter(
    (e) => selectedCategory === "All" || e.category === selectedCategory
  );

  const handleSwipeRight = (event: Event) => {
    setSavedEvents((prev) => [...prev, event]);
    removeTopEvent();
  };

  const handleSwipeLeft = (event: Event) => {
    removeTopEvent();
  };

  const removeTopEvent = () => {
    setEventsStack((prev) => prev.slice(0, prev.length - 1));
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
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
