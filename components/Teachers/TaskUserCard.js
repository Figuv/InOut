import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function TaskUserCard(props) {
  const user = props.userData;
  return (
    <View className="overflow-visible">
      <TouchableOpacity
        className="bg-[#fff] rounded-2xl w-80 h-12 justify-center items-center shadow-lg my-2"
        onPress={props.onPress}
      >
        <View className="items-center">
          <Text className="font-bold text-lg">{user.name}</Text>
          <Text className="text-gray-500">{user.email}</Text>
        </View>
        {
          props.screen == "TeamModal" ? (
            <TouchableOpacity
              className="absolute right-3 "
              onPress={props.removeUser}
            >
              <FontAwesomeIcon icon={faTrashAlt} size={20} color="#EC2008" />
            </TouchableOpacity>
          ) : null
        }
      </TouchableOpacity>
    </View>
  );
}
