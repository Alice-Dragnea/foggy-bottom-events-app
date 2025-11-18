// app/group-chat/[id].tsx
// fixes needed: make sure chat clears when you hit send, also make hitting enter on kepboard lets you send chat message (not just send button)
// give a dialogue box "Are you sure you want to leave this group? This chat will be deleted. (or do i want to just remove user access from chat??"
//edit LEAVE GROUP red box so it's on the upper right corner as a button.
//is there a way to model receiving messages?
//also get rid of group-chat/[id] writing that shows up on upper left corner tweak to say Back to Groups, Have Group [id] Chat in the middle of screen
/*
//older version that worked, saving in case modificaitons break app
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
*/

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
import { useEffect, useRef, useState } from "react";
import { Button, FlatList, Platform, Text, TextInput, View } from "react-native";
import { auth, db } from "../../constants/firebase";

/* -------------------------------------------------------------
   LEAVE GROUP
--------------------------------------------------------------*/
async function leaveGroup(groupId) {
  const ref = doc(db, "groups", groupId);

  await updateDoc(ref, {
    members: arrayRemove(auth.currentUser.uid)
  });

  router.back();
}

/* -------------------------------------------------------------
   MAIN GROUP CHAT SCREEN
--------------------------------------------------------------*/
export default function GroupChat() {
  const { id } = useLocalSearchParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const inputRef = useRef(null);

  /* -------------------------------------------------------------
     Load messages in real-time
  --------------------------------------------------------------*/
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

  /* -------------------------------------------------------------
     Send message + force-clear input on web
  --------------------------------------------------------------*/
  async function sendMessage() {
    if (!text.trim() && Platform.OS !== "web") return;
    if (Platform.OS === "web" && !inputRef.current?.value.trim()) return;

    const messageText = Platform.OS === "web" ? inputRef.current.value : text;

    await addDoc(collection(db, "groups", id, "messages"), {
      uid: auth.currentUser.uid,
      text: messageText,
      timestamp: serverTimestamp(),
    });

    // Native: controlled cleanup
    if (Platform.OS !== "web") {
      setText("");
    }

    // Web: manually clear DOM input
    if (Platform.OS === "web" && inputRef.current) {
      inputRef.current.value = "";
    }
  }

  /* -------------------------------------------------------------
     UI
  --------------------------------------------------------------*/
  return (
    <View style={{ flex: 1, padding: 12, backgroundColor: "white" }}>
      
      {/* Leave Group Button */}
      <Button title="Leave Group" color="red" onPress={() => leaveGroup(id)} />

      {/* Messages */}
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

      {/* Input Row */}
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        
        <TextInput
          ref={inputRef}
          value={Platform.OS === "web" ? undefined : text}
          onChangeText={Platform.OS === "web" ? undefined : setText}
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
