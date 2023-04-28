import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import db from "../database/firebase";

const EditTeamModal = (props) => {
  const { teamData } = props.route.params;
  const { id } = teamData;
  const [teamName, setTeamName] = useState("");

  //do the logic to the function editTeam
  const editTeam = async () => {
    const teamRef = doc(db, "teams", id);
    await updateDoc(teamRef, {
      teamName: teamName,
    });
    props.navigation.navigate("Teams");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#6F47EB] w-full h-full justify-center items-center">
      <View className="items-center justify-between px-4 space-y-3">
        <View className="items-center py-5">
          <Text className="text-white text-3xl font-bold">
            Edit Team {teamData.teamName}
          </Text>
        </View>
        <View className="flex-1 items-center">
          {/* Renderizar los campos editables */}
          <Text className="text-white text-xl font-bold">Edit team Name</Text>
          <View className="items-center px-4">
            <TextInput
              className="bg-white rounded-2xl w-80 h-12 px-4 font-bold mb-2"
              placeholder="Team Name"
              value={teamName}
              onChangeText={(text) => setTeamName(text)}
            />
          </View>
        </View>

        <View className="flex-row items-center justify-between px-4 space-x-1">
          <TouchableOpacity
            onPress={() => {
              editTeam();
            }}
            className="bg-gray-500 flex-grow rounded-2xl w-auto h-12 justify-center items-center shadow-lg"
          >
            <Text className="text-white text-lg font-bold">Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}
            className="bg-[#EC2008] flex-grow rounded-2xl w-auto h-12 justify-center items-center shadow-lg"
          >
            <Text className="text-white text-lg font-bold">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default EditTeamModal;
