import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { useLayoutEffect } from "react";
import { Avatar, Icon } from "@rneui/base";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  doc,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  console.log(chatMessages)
  console.log(FIREBASE_AUTH)
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerStyle: { backgroundColor: "dodgerblue" },
      headerTitleStyle: { color: "white" },
      headerTitleAlign: "left",
      headerTintColor: "white",
      headerTitle: () => (
        <View className="ml-4 flex-row items-center space-x-2">
          <Avatar rounded source={{uri:chatMessages[0]?.data.photoURL}} />
          <Text className="text-lg text-gray-100 font-semibold">
            {route.params.Title}
          </Text>
        </View>
      ),
    });
  }, [navigation,chatMessages]);
  useLayoutEffect(() => {
    const chatroomRef = doc(FIRESTORE_DB, "chatrooms", route.params.id);
    const chatsCollectionRef = collection(chatroomRef, "chats");
    const chatQuery = query(chatsCollectionRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(chatQuery, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setChatMessages(messages);
    });

    return () => {
      unsubscribe();
    };
  }, [route]);
  // console.log(chatMessages);
  const sendChat = async () => {
    Keyboard.dismiss();
    try {
      const chatroomRef = doc(FIRESTORE_DB, "chatrooms", route.params.id);
      const chatsCollectionRef = collection(chatroomRef, "chats");

      await addDoc(chatsCollectionRef, {
        timestamp: serverTimestamp(),
        chat: input,
        displayName: FIREBASE_AUTH.currentUser.displayName,
        email: FIREBASE_AUTH.currentUser.email,
        photoURL: FIREBASE_AUTH?.currentUser?.photoURL,
      });
      setInput("");
    } catch (error) {
      console.error("Error adding chat: ", error);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView className="mb-4">
              {chatMessages?.map(({ id, data }) =>
                data.email === FIREBASE_AUTH.currentUser.email ? (
                  <View
                    key={id}
                    className="bg-gray-100 rounded-lg w-fit relative my-4 mx-4 p-2 mb-4"
                    style={{ alignSelf: "flex-end" }}
                  >
                    <Avatar
                      position="absolute"
                      rounded
                      bottom={-20}
                      right={-5}
                      size={30}
                      source={{ uri: data?.photoURL }}
                      className="absolute -bottom-5 -right-1"
                    />
                    <Text>{data.chat}</Text>
                  </View>
                ) : (
                  <View
                    key={id}
                    className="bg-orange-300 rounded-lg w-fit relative flex-row items-center my-4 mx-4 p-2 mb-4"
                    style={{ alignSelf: "flex-start" }}
                  >
                    <Avatar
                      position="absolute"
                      rounded
                      bottom={-15}
                      left={-5}
                      size={30}
                      source={{ uri: data?.photoURL }}
                      className="absolute -bottom-4 -left-1"
                    />
                    <View>
                      <Text className="font-semibold text-white px-4">
                        {data.chat}{" "}
                      </Text>
                      <Text className="text-xs px-4 text-gray-500">
                        {data.displayName}
                      </Text>
                    </View>
                  </View>
                )
              )}
            </ScrollView>
            <View className="flex-row p-4 flex items-center space-x-2 ">
              {/* input chat footer */}
              <TextInput
                placeholder="Chat"
                value={input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={sendChat}
                className="flex-1 border-b border-gray-100 bg-blue-50 rounded-full p-2 placeholder:text-lg text-blue-400"
              />
              <TouchableOpacity onPress={sendChat}>
                <Icon name="send" type="ionicon" color="dodgerblue" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
