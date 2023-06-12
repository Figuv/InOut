import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function TaskCard(props) {
try {
} catch (error) {
  console.log(error);
}
  return (
   <View className="w-full px-2 items-center">
      <TouchableOpacity
        className="bg-[#fff] rounded w-full h-16 justify-center items-center shadow my-2 border-[#e7e7e6] border"
        // onPress={() => props.navigation.navigate("Modal")}
        onPress={props.onPress}
      >
        <View className="w-full h-full justify-center px-2">
          <Text className="text-[#000] font-bold text-lg">{props.task.title}</Text>
          <View className="flex-row w-full justify-between">
            <View className="flex-row mb-2">
              {/* <Text className="text-sm text-gray-500">
                Start: {props.startDate}
              </Text> */}
              <Text className="text-sm text-gray-500">Finaliza: {props.task.endDate.toDate().toDateString()}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
