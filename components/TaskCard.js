import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function TaskCard(props) {
try {
} catch (error) {
  console.log(error);
}
  return (
  
   <View>
      <TouchableOpacity
        className="bg-[#fff] rounded-2xl w-80 h-20 justify-center items-center shadow-lg my-2"
        // onPress={() => props.navigation.navigate("Modal")}
        onPress={props.onPress}
      >
        <Text className="text-[#000] font-bold text-2xl">
          {props.task.title}
        </Text>
        <View className="flex-row justify-between mb-2">
          {/* <Text className="text-sm text-gray-500">
            Start: {props.startDate}
          </Text> */}
          <Text className="text-sm text-gray-500">End: {props.task.endDate.toDate().toDateString()}</Text>
        </View>
        <Text className="text-sm font-bold text-blue-500">{props.state}</Text>
      </TouchableOpacity>
    </View>
  );
}
