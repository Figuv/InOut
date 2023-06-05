import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from '@expo/vector-icons';

export default function UserCard(props) {
  const user = props.userData;
  return (
    <View className="w-full px-2 items-center">
      <TouchableOpacity
        className="bg-[#fff] rounded flex-row w-full h-16 justify-center items-center shadow my-2 border-[#e7e7e6] border"
        onPress={props.onPress}
      >
        <View className="w-full h-full flex-row pl-2 justify-start items-center">
          <Image source={{uri: "https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg"}} className="h-12 w-12 rounded-full"/>
          <View className="ml-2 ">
            <Text className="font-bold text-lg">{user.name}</Text>
            <Text className="text-gray-500">{user.email}</Text>
          </View>
        </View>
        {
          props.screen == "TeamModal" ? (
            <TouchableOpacity
              className="h-full absolute right-2 justify-center items-center"
              onPress={props.removeUser}
            >
              <FontAwesome name="trash-o" size={24} color="#EC2008"/>
            </TouchableOpacity>
          ) : null
        }
      </TouchableOpacity>
    </View>
  );
}
