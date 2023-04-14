import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useEffect, useContext } from "react";
import { AppContext } from "../AppContext";
const Home = (props) => {

  const { globalData } = useContext(AppContext);
  const { user } = globalData;
  console.log(user.teamId);
  // useEffect(() => {
  //   const { user } = props.route.params;
  //   console.log(user.teamId);
  // }, []);

  return (
    <View className="bg-[#fff] h-full w-full items-center justify-center">
      <SafeAreaView>
        {/* make a button in the center of the screen */}
        <View className="flex-col h-screen items-center justify-center space-y-2">
          <TouchableOpacity
            className="bg-[#fff] rounded-2xl w-80 h-12 justify-center items-center shadow-lg"
            onPress={() => props.navigation.navigate("Tasks", {user: user})}
          >
            <Text className="text-[#6F47EB] font-bold text-2xl">Tasks</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#fff] rounded-2xl w-80 h-12 justify-center items-center shadow-lg"
            onPress={() => props.navigation.navigate("AddUser")}
          >
            <Text className="text-[#6F47EB] font-bold text-2xl">Add User</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#fff] rounded-2xl w-80 h-12 justify-center items-center shadow-lg"
            onPress={() => props.navigation.navigate("Users")}
          >
            <Text className="text-[#6F47EB] font-bold text-2xl">Users</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#fff] rounded-2xl w-80 h-12 justify-center items-center shadow-lg"
            onPress={() => props.navigation.navigate("AddTeam")}
          >
            <Text className="text-[#6F47EB] font-bold text-2xl">Add Team</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#fff] rounded-2xl w-80 h-12 justify-center items-center shadow-lg"
            onPress={() => props.navigation.navigate("Teams")}
          >
            <Text className="text-[#6F47EB] font-bold text-2xl">Teams</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#fff] rounded-2xl w-80 h-12 justify-center items-center shadow-lg"
            onPress={() => props.navigation.navigate("AddTask")}
          >
            <Text className="text-[#6F47EB] font-bold text-2xl">Add Task</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Home;
