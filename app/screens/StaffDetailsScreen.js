import { View, Text, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Icon } from "@rneui/base";

const StaffDetailsScreen = () => {
  const [userdetails, setUserDetails] = useState();
  const route = useRoute();
  const navigation = useNavigation();
  const id = route.params.id;
  const users = route.params.users;
  useEffect(() => {
    const user = users.find((item) => item.id === id);
    setUserDetails(user?.data);
  }, [id, users]);

  console.log(userdetails);
  return (
    <View>
      <Image
        className="w-full h-[300px] object-cover"
        source={{ uri: userdetails?.photoURL }}
      />
      <Pressable
        onPress={() => navigation.goBack()}
        className="w-10 h-10 rounded-full absolute items-center justify-center bg-blue-300 top-10 left-3"
      >
        <Icon name="arrowleft" type="antdesign" />
      </Pressable>
      <View>
        <View className="p-4">
          <Text className="text-xl font-semibold text-center">
            Details about me{" "}
          </Text>
          <View>
            <Text className="text-center text-3xl font-bold underline">
              {userdetails?.fullname}
            </Text>
            <View className="items-center">
              <Text>{userdetails?.email}</Text>
              <Text><Text className="font-semibold">Mobile:</Text> {userdetails?.phone}</Text>
              <Text><Text className="font-semibold">Department:</Text> {userdetails?.department}</Text>
              <Text><Text className="font-semibold">Role:</Text> {userdetails?.role}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default StaffDetailsScreen;
