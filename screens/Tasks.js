import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import db from "../database/firebase";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import TaskCard from "../components/TaskCard";
import { AppContext } from "../AppContext";
import { FontAwesome } from "@expo/vector-icons";

const Tasks = (props) => {
  const { globalData } = useContext(AppContext);
  const { user } = globalData;
  const [tasks, setTasks] = useState([]);
  const { teamId } = user;

  // Get tasks
  useEffect(() => {
    const q = query(
      collection(db, "tasks"),
      where("teamId", "==", teamId.trim()),
      where("state", "==", 1)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksData = [];
      querySnapshot.forEach((doc) => {
        const task = doc.data();
        task.id = doc.id;
        tasksData.push(task);
      });
      setTasks(tasksData);
    });
    return unsubscribe;
  }, []);

  const showModal = (taskData) => {
    props.navigation.navigate("ModalTask", { taskData });
  };

  return (
    <View className="bg-[#6F47EB] h-full w-full items-center justify-center">
      <SafeAreaView>
        <View className="flex-col items-center justify-center">
          <View className="">
            <Text className="text-white font-black text-4xl">Tasks</Text>
          </View>
          <ScrollView
            className="flex-1 w-full h-auto"
            showsVerticalScrollIndicator={false}
          >
            {tasks.map((task, index) => {
              return (
                <TaskCard
                  key={index}
                  task={task}
                  onPress={() => showModal(task)}
                />
              );
            })}
          </ScrollView>

          <View className="bg-white absolute bottom-0 w-screen items-center">
            <TouchableOpacity
              onPress={() => props.navigation.navigate("ModalTask")}
              className="bg-white w-16 h-16 items-center justify-center"
            >
              <FontAwesome name="plus" size={24} color="#6F47EB" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Tasks;
