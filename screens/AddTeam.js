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
import db from "../database/firebase";

const AddTeam = (props) => {
  const [teamName, setTeamName] = useState("");

  const handleCreateTeam = async () => {
    if (teamName.length === 0) {
      alert("Please enter a team name");
    } else {
      try {
        await addDoc(collection(db, "teams"), {
          teamName: teamName,
        });
        props.navigation.navigate("Home");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <KeyboardAvoidingView
      className="bg-[#fff] h-full w-full items-center justify-center"
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
