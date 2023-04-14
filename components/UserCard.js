import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function UserCard(user) {
  console.log(user);
  return (
    <View className="overflow-visible">
      <TouchableOpacity className="bg-[#fff] rounded-2xl w-80 h-12 justify-center items-center shadow-lg my-2">
        {/* <Image
        source={{ uri: user.avatarUrl }}
        className="w-16 h-16 rounded-full mr-4"
      /> */}
        <View>
          <Text className="font-bold text-lg">{user.name}</Text>
          <Text className="text-gray-500">{user.email}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}