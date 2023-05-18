import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

export default function TeamCard(props) {
  
  return (
    <View>
      <TouchableOpacity
        className="bg-[#fff] rounded-2xl w-80 h-12 justify-center items-center shadow-lg my-2"
        // onPress={() => props.navigation.navigate("Modal")}
        onPress={props.onPress}
      >
        <Text className="text-[#000] font-bold text-2xl">{props.teamName}</Text>
      </TouchableOpacity>
    </View>
  );
}
