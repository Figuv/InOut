import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import db from "../../database/firebase";
import DropDownPicker from "react-native-dropdown-picker";
import TaskCard from "../TaskCard";

const TeamModal = (props) => {
  const { teamData } = props.route.params;
  const [tasks, setTasks] = useState([]);
  const { id } = teamData;

  //Get users of the team
  useEffect(() => {
    const q = query(collection(db, "tasks"), where("teamId", "==", id.trim()), where("state", "==", 1));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const teamTask = [];
      querySnapshot.forEach((doc) => {
        const task = doc.data();
        task.id = doc.id;
        teamTask.push(task);
      });
      setTasks(teamTask);
    });
    return unsubscribe;
  }, []);

  //Delete team
  const deleteTeam = () => {
    const teamRef = collection(db, "teams");
    deleteDoc(doc(teamRef, teamData.id))
      .then(() => {
        console.log("Team deleted successfully");
        props.navigation.goBack();
      })
      .catch((error) => {
        console.error("Error deleting team: ", error);
      });
  };
  //Edit team
  const editTeam = () => {
    props.navigation.navigate("ModalEditTeam", { teamData });
  };

  const showModal = (taskData) => {
    taskData.teamId = id;
    props.navigation.navigate("ModalTaskUsers", { taskData });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#6F47EB] w-full h-full justify-center items-center">
      <View className="items-center justify-between px-4 space-x-4">
        <View className=" p-5">
          <Text className="text-white text-3xl font-bold">
            {teamData.teamName}
          </Text>
          <Text className="text-white text-lg">{teamData.description}</Text>
        </View>
        <ScrollView className="flex-1">
          {tasks.map((task, index) => (
            <TaskCard key={index} task={task} onPress={() => showModal(task)} />
          ))}
        </ScrollView>

        <View className="flex-row items-center justify-between px-4 space-x-1">
          <TouchableOpacity
            onPress={() => {
              editTeam();
            }}
            className="bg-gray-500 flex-grow rounded-2xl w-auto h-12 justify-center items-center shadow-lg"
          >
            <Text className="text-white text-lg font-bold">Edit Team</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteTeam()}
            className="bg-[#EC2008] flex-grow rounded-2xl w-auto h-12 justify-center items-center shadow-lg"
          >
            <Text className="text-white text-lg font-bold">Delete Team</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TeamModal;
