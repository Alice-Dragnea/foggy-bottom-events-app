import { router } from "expo-router";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import {
    addDoc,
    arrayUnion,
    collection,
    getDocs,
    onSnapshot,
    query,
    updateDoc,
    where
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth, db } from "../../constants/firebase";

/* -------------------------------------------------------------
   MAIN GROUPS SCREEN
--------------------------------------------------------------*/
export default function GroupsScreen() {
  const [groups, setGroups] = useState([]);
  const [joinCode, setJoinCode] = useState("");
  const [user, setUser] = useState(null);

  /* -------------------------------------------------------------
    Ensure User is Signed In (Anonymous for prototyping)
  --------------------------------------------------------------*/
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        // Auto-login anonymously for web + testing
        signInAnonymously(auth);
      } else {
        setUser(u);
      }
    });
    return unsub;
  }, []);

  /* -------------------------------------------------------------
    Load groups user belongs to
  --------------------------------------------------------------*/
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "groups"),
      where("members", "array-contains", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const myGroups = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setGroups(myGroups);
    });

    return unsubscribe;
  }, [user]);

  /* -------------------------------------------------------------
    Create a new group
  --------------------------------------------------------------*/
  async function createGroup() {
    if (!user) {
      alert("You must be logged in to create a group.");
      return;
    }

    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    await addDoc(collection(db, "groups"), {
      name: `Group ${code}`,
      code,
      members: [user.uid]
    });
  }

  /* -------------------------------------------------------------
    Join a group using its code
  --------------------------------------------------------------*/
  async function joinGroup() {
    if (!joinCode.trim()) return;

    if (!user) {
      alert("You must be logged in to join a group.");
      return;
    }

    const q = query(collection(db, "groups"), where("code", "==", joinCode.trim()));
    const snap = await getDocs(q);

    if (!snap.empty) {
      const groupDoc = snap.docs[0];

      await updateDoc(groupDoc.ref, {
        members: arrayUnion(user.uid)
      });

      setJoinCode("");
      alert("Joined group!");
    } else {
      alert("No group found with that code");
    }
  }

  /* -------------------------------------------------------------
    UI Layout
  --------------------------------------------------------------*/
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
      
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Groups</Text>

      <Button title="Create New Group" onPress={createGroup} />

      <Text style={{ marginTop: 20, fontWeight: "600" }}>Join a Group</Text>
      <TextInput
        value={joinCode}
        onChangeText={setJoinCode}
        placeholder="Enter 6-letter code"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          borderRadius: 8,
          marginTop: 5
        }}
      />
      <Button title="Join Group" onPress={joinGroup} />

      <Text style={{ marginTop: 30, fontWeight: "600", fontSize: 18 }}>
        My Groups
      </Text>

      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/group-chat/${item.id}`)}
            style={{
              padding: 15,
              backgroundColor: "#f2f2f2",
              borderRadius: 10,
              marginVertical: 5
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              {item.name}
            </Text>
            <Text style={{ fontSize: 12, color: "#777" }}>
              Code: {item.code}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
