import { View, Text, Linking, TouchableOpacity } from "react-native";
import React from "react";

export default function HourCard(props) {
  const { session } = props;

  try {
  } catch (error) {
    console.log(error);
  }
  const openMap = () => {
    const { latitude, longitude } = session.location;
    const url = `https://maps.google.com/?q=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  return (
    <View className="w-full px-2 items-center">
      <View
        className="bg-[#fff] rounded w-full h-16 justify-center items-center shadow my-2 border-[#e7e7e6] border"
        // onPress={() => props.navigation.navigate("Modal")}
        // onPress={props.onPress}
      >
        <View className="w-full h-full justify-center px-2 ">
          <Text className="text-[#000] font-bold text-lg">
            {session.logDate}
          </Text>
          <View className="flex-row w-full justify-between">
            <View className="flex-row mb-2">
              <Text className="text-sm text-gray-500">
                Login hour: {session.loginTime}
              </Text>
              <Text className="text-sm text-gray-500">
                Logout hour: {session.logoutTime}
              </Text>
              <Text className="text-sm text-gray-500">
                Total hours: {session.hours}
              </Text>
            </View>
            <TouchableOpacity
              className="flex-row items-center bg-[#e7e7e6] rounded-full px-2 py-1 mr-2"
              onPress={openMap}
            >
              <Text className="text-[#000] text-sm mr-1">
                Ubicacion del login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
