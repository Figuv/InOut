import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../../database/firebase";
import UserCard from "../UserCard";

const TaskModalUsers = (props) => {
  const { taskData } = props.route.params; // obtén los datos del equipo desde las props
  const [modalVisible, setModalVisible] = useState(false);
  const [taskStatus, setTaskStatus] = useState(taskData.state);
  const { id } = taskData;
  const [users, setUsers] = useState([]);
  const { teamId } = taskData;

  useEffect(() => {
    // Get task state and URL
    const getTaskData = async () => {
      try {
        const taskDocRef = doc(db, "user_task", id);
        const taskDocSnap = await getDoc(taskDocRef);
        if (taskDocSnap.exists()) {
          const taskData = taskDocSnap.data();
          setState(taskData.state);
          setUrl(taskData.URL);
        }
      } catch (error) {
        console.log("Error getting task data: ", error);
      }
    };

    // Get users with matching teamId
    const getUsers = async () => {
      try {
        const q = query(collection(db, "users"), where("teamId", "==", teamId));
        const querySnapshot = await getDocs(q);
        const usersData = [];
        querySnapshot.forEach((doc) => {
          usersData.push(doc.data());
        });
        setUsers(usersData);
      } catch (error) {
        console.log("Error getting users: ", error);
      }
    };

    getTaskData();
    getUsers();
  }, []);

  return (
    <View className="bg-[#6F47EB] h-full w-full items-center justify-center">
      <SafeAreaView>
        <View className="flex-col items-center justify-center">
          <View>
            <Text className="text-white font-black text-4xl">Users</Text>
          </View>
          <ScrollView>
            {users.map((user, index) => (
              <UserCard
                key={index}
                userData={user}
                screen="Users"
              />
            ))}
          </ScrollView>
          
        </View>
      </SafeAreaView>
    </View>
  );
};

export default TaskModalUsers;
