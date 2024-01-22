import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Icon } from "@rneui/base";
import { FIREBASE_AUTH } from "../../firebaseConfig";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;
  const signUserOut = () => {
    auth.signOut().then(() => {
      navigation.replace("LoginScreen");
    });
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Welcome",
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
            <Icon name="arrow-right" type="feather" color="lightblue" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  return (
    <SafeAreaView className="flex-1 items-center justify-center p-4">
      <View className="items-center justify-center">
        <View  className="mb-10">
          <Text className="text-xl">Welcome to Opex Consulting</Text>
          <Text className="text-sm text-center">Platform Engagement Instructions</Text>
        </View>
        <View className="border rounded-md p-2 border-gray-400 mb-5 space-y-2">
          <Text>Be Polite and chat responsibly</Text>
          <Text>Work resumes by 8:00 am every day</Text>
          <Text>Respond to your chat on time</Text>
          <Text>Be sure to always log out</Text>
          <Text>Report any malicious chat to the management</Text>
          <Text>Be aware of our data policies</Text>
          <Text>Be sensitive to the spirit of God</Text>
        </View>
        <View>
          <Text className="text-orange-400 text-sm font-semibold">To go to the rooms</Text>
          <Text>
            Please click on the right arrow at the top right corner...
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
