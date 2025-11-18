import { Stack } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.title}>Bottoms Up</Text>
        <View style={styles.topBarRight}>
          <Image
            source={{ uri: "https://i.pravatar.cc/40" }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuText}>☰</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    height: 60,
    backgroundColor: "#FF6347",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  title: { fontSize: 20, color: "white", fontWeight: "bold" },
  topBarRight: { flexDirection: "row", alignItems: "center" },
  profileImage: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  menuButton: {},
  menuText: { fontSize: 24, color: "white" },
});
