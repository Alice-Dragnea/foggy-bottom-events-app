import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Event } from "../constants/Events";

// For now, we’ll mock saved events
const MOCK_SAVED_EVENTS: Event[] = [
  {
    id: "1",
    title: "Saved Event Example",
    category: "concerts",
    description: "This is a saved event.",
    image: "https://picsum.photos/200/300?random=5",
  },
];

export default function Saved() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Events</Text>
      {MOCK_SAVED_EVENTS.length === 0 ? (
        <Text style={styles.empty}>No saved events yet.</Text>
      ) : (
        <FlatList
          data={MOCK_SAVED_EVENTS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.description}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  empty: { fontSize: 16, color: "#888", textAlign: "center", marginTop: 50 },
  card: {
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: { width: "100%", height: 150, borderRadius: 10, marginBottom: 5 },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
  cardDesc: { fontSize: 14, color: "#555" },
});
