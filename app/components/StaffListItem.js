import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const StaffListItem = ({ data, id, users }) => {
  const navigation = useNavigation();
  const { fullname, department, email, phone, photoURL, role } = data;
  return (
    <TouchableOpacity
      className=""
      onPress={() =>
        navigation.navigate("StaffDetails", { id: id, users: users })
      }
    >
      <View className="w-[150px] h-[220px] bg-white border border-gray-100 rounded-lg shadow-lg">
        <Image
          className="w-[150px] h-[100px] object-cover rounded-t-lg"
          source={{ uri: photoURL }}
        />
        <View className="p-2">
          <View className="flex-row items-center justify-between">
            <Text className="font-semibold">{fullname}</Text>
          </View>

          <Text className="font-semibold">{phone}</Text>
          <Text numberOfLines={1} className="font-semibold">
            {email}
          </Text>
          <Text>Dept: {department}</Text>
          <Text numberOfLines={1}>Role: {role}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StaffListItem;
