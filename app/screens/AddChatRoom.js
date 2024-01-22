import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLayoutEffect } from "react";
import { Icon } from "@rneui/base";
import { useFormik } from "formik";
import * as Yup from "yup";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
import CustomListItem from "../components/CustomListItem";

const AddChatRoom = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [chatrooms, setChatrooms] = useState([])
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Create a chat room",
      headerStyle: { backgroundColor: "dodgerblue" },
      headerTitleStyle: { color: "white" },
      headerTintColor: "white",
      headerRight: () => (
        <View className="mr-4 flex-row space-x-4 justify-center">
          {/* <TouchableOpacity activeOpacity={0.5} onPress={signUserOut}>
                <Icon name="camerao" type="ant-design" color="white" />
              </TouchableOpacity> */}
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Home")}
          >
            <Icon name="home" type="feather" color="lightblue" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  const formik = useFormik({
    initialValues: {
      chatroom: "",
    },
    validationSchema: Yup.object({
      chatroom: Yup.string()
        .min(4, "Must be 4 characters or more")
        .required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      createChatRoom(values);
      resetForm();
    },
  });
  const createChatRoom = async (values) => {
    const { chatroom } = values;
    // console.log(values);
    setLoading(true);
    try {
       await addDoc(collection(FIRESTORE_DB, "chatrooms"), {
        Title: chatroom,
      });
      console.log("Chat room created successfully: ", chatroom);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
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
  const goToChat = (id,Title)=>{
    navigation.navigate("Chat",{
      id,
      Title
    })
    }
  return (
    <SafeAreaView className="p-4 bg-white flex-1 items-start justify-start">
      <ScrollView style={{ flex: 1, width:"100%" }} showsVerticalScrollIndicator={false}>

      <View className="flex-row space-x-2 border-b border-gray-100 py-2 flex items-center">
        <Icon name="wechat" type="ant-design" color="gray" />
        <TextInput
          id="chatroom"
          name="chatroom"
          placeholder="Create chatroom"
          value={formik.values.chatroom}
          onChangeText={formik.handleChange("chatroom")}
          onBlur={formik.handleBlur("chatroom")}
          className="flex-1"
        />
        {formik.touched.chatroom && formik.errors.chatroom ? (
          <Text className="text-xs text-red-300 text-center">
            {formik.errors.chatroom}
          </Text>
        ) : null}
      </View>
      <TouchableOpacity
        onPress={formik.handleSubmit}
        className="mt-5 bg-blue-400 p-3 rounded-lg w-full mb-5"
      >
        <Text className="text-center font-semibold text-white text-sm">
          {loading ? "Creating ...." : "Create Room"}
        </Text>
      </TouchableOpacity>
      <View className="w-full gap-2 mt-5 mb-5">
        <Text className="mb-0 mt-5 text-center text-lg font-semibold">All available Created Rooms</Text>
        <Text className="mb-5 text-center">Kindly click to go to your room</Text>
        <ScrollView>
        {chatrooms?.map(({ id, data: { Title } }, index) => (
          <CustomListItem key={id} id={id} Title={Title} index={index} goToChat={goToChat}/>
        ))}
      </ScrollView>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddChatRoom;
