import {
  View,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import db from "../../database/firebase";
import { AppContext } from "../../AppContext";

const AddTeam = (props) => {
  const {globalData}=AppContext;
  const {user}=globalData;
  const{id}=user;
  const [teamName, setTeamName] = useState("");

  // Create team function
  const handleCreateTeam = async () => {
    if (teamName.length === 0) {
      alert("Please enter a team name");
    } else {
      try {
        await addDoc(collection(db, "teams"), {
          teamName: teamName,
          adminId: id
        });
        props.navigation.navigate("Home");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <KeyboardAvoidingView
      className="bg-[#6F47EB] h-full w-full items-center justify-center"
      behavior="padding"
    >
      <SafeAreaView>
        <View className="flex-col h-screen items-center justify-center">
          {/* Header */}
          <View className="my-4">
            <Text className="text-white font-black text-4xl">New Team</Text>
          </View>
          {/* Inputs */}
          <View className="space-y-4 items-center">
            <TextInput
              className="bg-white rounded-2xl w-80 lg:w-96 h-12 px-4 font-bold"
              placeholder="Email"
              onChangeText={(text) => setTeamName(text)}
            ></TextInput>

            {/* Create Team */}
            <View>
              <TouchableOpacity
                className="bg-[#6F47EB] rounded-2xl w-80 h-12 justify-center items-center shadow-md"
                onPress={handleCreateTeam}
              >
                <Text className="text-[#fff] font-bold text-2xl">
                  Create Team
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default AddTeam;
