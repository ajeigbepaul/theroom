import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useLayoutEffect } from "react";
import { Icon } from "@rneui/base";
import { useFormik } from "formik";
import * as Yup from "yup";
import { collection, addDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";

const AddChatRoom = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Create a chat room",
      headerStyle: { backgroundColor: "dodgerblue" },
      headerTitleStyle: { color: "white" },
      headerTintColor: "white",
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
      resetForm()
    },
  });
  const createChatRoom = async (values) => {
    const {chatroom} = values
    // console.log(values);
    setLoading(true);
    try {
      const docRef = await addDoc(collection(FIRESTORE_DB, "chatrooms"), {
        Title: chatroom,
      });
      console.log("Chat room created successfully: ", chatroom);
      setLoading(false);
      // if(docRef){
      //     navigation.goBack()
      // }
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
  };
  return (
    <View className="p-4 bg-white flex-1 items-center justify-center">
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
        className="mt-5 bg-blue-400 p-3 rounded-lg w-full"
      >
        <Text className="text-center font-semibold text-white text-sm">
          {loading ? "Creating ...." : "Create Room"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddChatRoom;
