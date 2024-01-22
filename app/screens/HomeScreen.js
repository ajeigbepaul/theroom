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
import StaffListItem from "../components/StaffListItem";
const HomeScreen = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const auth = FIREBASE_AUTH;
  const signUserOut = () => {
    auth.signOut().then(() => {
      navigation.replace("LoginScreen");
    });
  };
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(FIRESTORE_DB, "users"),
      (querySnapshot) =>
        setUsers(
          querySnapshot?.docs?.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      // const chatroomData = new Map();
    );

    return () => {
      unsubscribe();
    };
  }, []);
  console.log(users);
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
  // const goToChat = (id, Title) => {
  //   navigation.navigate("Chat", {
  //     id,
  //     Title,
  //   });
  // };
  return (
    <SafeAreaView>
      <ScrollView className="h-full bg-white p-2">
        <Text className="text-2xl font-semibold text-center">
          Welcome to Opex Room
        </Text>
        <Text className="text-center mt-3 text-[16px] mb-5">
          Meet the Opex staff 
        </Text>
        <View className="flex-row items-center justify-between">
          {users?.map(({ data, id }, index) => (
            <StaffListItem key={index} data={data} id={id} users={users} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
