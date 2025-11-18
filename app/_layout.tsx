import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
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

      {/* Bottom Tabs */}
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#FF6347",
          tabBarInactiveTintColor: "#555",
          tabBarStyle: { height: 60, paddingBottom: 5 },
        }}
      >
        <Tabs.Screen
          name="tabs/home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="tabs/saved"
          options={{
            title: "Saved",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bookmark-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="tabs/groups"
          options={{
            title: "Groups",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
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
