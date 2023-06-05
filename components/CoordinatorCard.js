import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from '@expo/vector-icons';

export default function CoordinatorCard(props) {
  const coordinator = props.userData;
  return (
    <View className="w-full px-2 items-center">
      <TouchableOpacity
        className="bg-[#fff] rounded w-full h-16 justify-center items-center shadow my-2 border-[#e7e7e6] border"
        onPress={props.onPress}
      >
        <View className="w-full h-full px-2 justify-center">
          <Text className="font-bold text-lg">{coordinator.name}</Text>
          <Text className="text-gray-500">{coordinator.email}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
