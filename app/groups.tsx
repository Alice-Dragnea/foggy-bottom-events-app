import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Groups() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Groups / Chats</Text>
      <Text style={styles.empty}>This screen is under construction.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  empty: { fontSize: 16, color: "#888", textAlign: "center", marginTop: 20 },
});
