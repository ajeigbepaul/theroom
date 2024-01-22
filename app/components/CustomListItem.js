import { View, Text, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { Avatar } from "@rneui/base";
import {  FIRESTORE_DB } from "../../firebaseConfig";
import { useState } from "react";
import {
  doc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useLayoutEffect } from "react";
const CustomListItem = ({ id, Title, index, goToChat }) => {
  const [mymessages, setMyMessages] = useState([]);
  useLayoutEffect(() => {
    const chatroomRef = doc(FIRESTORE_DB, "chatrooms", id);
    const chatsCollectionRef = collection(chatroomRef, "chats");
    const chatQuery = query(chatsCollectionRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(chatQuery, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({
          // id: doc.id,
          data: doc.data(),
        });
      });
      setMyMessages(messages);
      // console.log("some", mymessages);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const URL = mymessages?.map((message) => {
    return message?.data?.photoURL;
  });
  const lastChat = mymessages?.map((message) => {
    return message?.data?.chat;
  });
   const lastDisplayname = mymessages?.map((message) => {
     return message?.data?.displayName;
   });
  const chatCount = mymessages?.map((message) => {
    return message?.data?.chat;
  });
  // console.log("this is the URL ", URL);
  const titleColors = [
    "text-orange-400",
    "text-blue-400",
    "text-green-400",
    "text-purple-400",
    "text-red-400",
    "text-gray-400",
    "text-yellow-700",
  ];
  const titlebgColors = [
    "bg-orange-100",
    "bg-blue-100",
    "bg-green-100",
    "bg-purple-100",
    "bg-red-100",
    "bg-gray-700",
    "bg-yellow-100",

  ];
  return (
    <TouchableWithoutFeedback
      onPress={() => goToChat(id, Title)}
    >
      <View className={`flex-row space-x-3 ${
              titlebgColors[index % titlebgColors.length]
            } p-2 border-b border-gray-50 my-2 rounded-lg shadow-lg`}>
        {URL[0] ? (
          <Avatar rounded source={{ uri: URL[0] }} />
        ) : (
          <Avatar rounded source={require("../../assets/profilepics.jpg")} />
        )}

        <View className="flex-1">
          <Text
            className={`text-sm ${
              titleColors[index % titleColors.length]
            } font-semibold`}
          >
            {Title}
          </Text>
          {lastDisplayname[0] && lastChat[0] ? (
            <Text className="text-sm text-gray-500" numberOfLines={1}>
              {lastDisplayname[0] + " : " + lastChat[0]}
            </Text>
          ) : (
            <Text className="text-sm text-gray-500" numberOfLines={1}>
             No chat yet !!!
            </Text>
          )}
         
        </View>
        <View className="w-8 h-6 rounded-md bg-blue-400  items-center justify-center ">
          <Text className="font-semibold text-white">{chatCount.length}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomListItem;
