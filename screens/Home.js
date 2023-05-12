import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useEffect, useContext } from "react";
import { AppContext } from "../AppContext";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import db from "../database/firebase";
const Home = (props) => {
  const { globalData } = useContext(AppContext);
  const { user } = globalData;

  // Log out function
  const logOut = async () => {
    const q = query(collection(db, "session"), where("userId", "==", user.id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      const session = doc.data();
      session.id = doc.id;
      await updateSession(session);
    });
  };

  //Set the logout time and calculate the time difference
  const updateSession = async (session) => {
    const date =
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate();
    const date1 = new Date(`${date} ${session.loginTime}`);
    const date2 = new Date(`${date} ${new Date().toLocaleTimeString()}`);
    const timeDifference = date2 - date1;
    const hours = Math.floor(timeDifference / 3600000);
    const minutes = Math.floor((timeDifference % 3600000) / 60000);
    const seconds = Math.floor(((timeDifference % 360000) % 60000) / 1000);
    // console.log(timeDifference);
    await updateDoc(doc(db, "session", session.id), {
      logoutTime: new Date().toLocaleTimeString(),
      hours: hours + ":" + minutes + ":" + seconds,
    });
  };

  return (
    <View className="bg-[#fff] h-full w-full items-center justify-center">
      <SafeAreaView>
        {/* make a button in the center of the screen */}
        <View className="flex-col h-screen items-center justify-center space-y-2">
          <TouchableOpacity
            className="bg-[#fff] rounded-2xl w-80 h-12 justify-center items-center shadow-lg"
            onPress={() => props.navigation.navigate("Tasks")}
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
          <TouchableOpacity
            className="bg-[#EC2008] rounded-2xl w-80 h-12 justify-center items-center shadow-lg"
            onPress={logOut}
          >
            <Text className="text-[#191717] font-bold text-2xl">Log Out</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Home;
