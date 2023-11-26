import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { Avatar } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import { Icon } from "@rneui/base";
import CustomListItem from "../components/CustomListItem";
import { useState } from "react";
import { useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
const HomeScreen = () => {
  const navigation = useNavigation();
  const [chatrooms, setChatrooms] = useState([]);
  const auth = FIREBASE_AUTH;
  const signUserOut = () => {
    auth.signOut().then(() => {
      navigation.replace("LoginScreen");
    });
  };
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(FIRESTORE_DB, "chatrooms"),
      (querySnapshot) => setChatrooms(querySnapshot?.docs?.map((doc) => ({
        id:doc.id,
        data:doc.data()
      })))
      // const chatroomData = new Map();
    );

    return () => {
      unsubscribe();
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "The Room",
      headerStyle: { backgroundColor: "dodgerblue" },
      headerTitleStyle: { color: "white" },
      headerTintColor: "white",
      headerLeft: () => (
        <View className="ml-4 ">
          <TouchableOpacity activeOpacity={0.5} onPress={signUserOut}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View className="mr-4 flex-row space-x-4 justify-center">
          {/* <TouchableOpacity activeOpacity={0.5} onPress={signUserOut}>
            <Icon name="camerao" type="ant-design" color="white" />
          </TouchableOpacity> */}
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("AddChatRoom")}
          >
            <Icon name="pencil" type="font-awesome" color="lightblue" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  // console.log(chatrooms);
  const goToChat = (id,Title)=>{
  navigation.navigate("Chat",{
    id,
    Title
  })
  }
  return (
    <SafeAreaView>
      <ScrollView className="h-full bg-white">
        {chatrooms?.map(({ id, data: { Title } }, index) => (
          <CustomListItem key={id} id={id} Title={Title} index={index} goToChat={goToChat}/>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
