import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

export default function TeamCard(props) {
  
  return (
    <View className=" w-full px-2 items-center">
      <TouchableOpacity
        className="bg-[#fff] rounded w-full h-12 justify-center items-center shadow my-2 border-[#e7e7e6] border"
        // onPress={() => props.navigation.navigate("Modal")}
        onPress={props.onPress}
      >
        <Text className="text-black font-bold text-lg">{props.teamName}</Text>
      </TouchableOpacity>
    </View>
  );
}
