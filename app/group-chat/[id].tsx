// app/group-chat/[id].tsx

import { router, useLocalSearchParams } from "expo-router";
import {
  addDoc,
  arrayRemove,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import { auth, db } from "../../constants/firebase"; // <-- updated import path

async function leaveGroup(groupId) {
  const ref = doc(db, "groups", groupId);

  await updateDoc(ref, {
    members: arrayRemove(auth.currentUser.uid)
  });

  router.back();
}

export default function GroupChat() {
  const { id } = useLocalSearchParams();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!id) return;

    const msgRef = collection(db, "groups", id, "messages");
    const q = query(msgRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
    });

    return unsubscribe;
  }, [id]);

  async function sendMessage() {
    if (!text.trim()) return;

    await addDoc(collection(db, "groups", id, "messages"), {
      uid: auth.currentUser.uid,
      text,
      timestamp: serverTimestamp()
    });

    setText("");
  }

  return (
    <View style={{ flex: 1, padding: 12, backgroundColor: "white" }}>
      <Button title="Leave Group" color="red" onPress={() => leaveGroup(id)} />

      <FlatList
        style={{ marginTop: 20 }}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              alignSelf:
                item.uid === auth.currentUser.uid ? "flex-end" : "flex-start",
              backgroundColor:
                item.uid === auth.currentUser.uid ? "#cce5ff" : "#eee",
              padding: 10,
              marginVertical: 5,
              borderRadius: 10,
              maxWidth: "80%"
            }}
          >
            <Text>{item.text}</Text>
          </View>
        )}
      />

      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Write a message..."
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            borderRadius: 8
          }}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
}
