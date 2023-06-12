import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import db from "../database/firebase";
import React, { useContext, useEffect, useState } from "react";
import Constants from "expo-constants";
import TaskCard from "../components/TaskCard";
import { AppContext } from "../AppContext";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const HomeUsers = (props) => {
  const { globalData } = useContext(AppContext);
  const { user } = globalData;
  const [tasks, setTasks] = useState([]);
  const [tasksCount, setTasksCount] = useState("");
  const { teamId } = user;

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
      countTask();
    });
    return unsubscribe;
  }, []);

  const showModal = (taskData) => {
    props.navigation.navigate("ModalTaskUser", { taskData });
  };

  const countTask = async () => {
    const q = query(
      collection(db, "tasks"),
      where("teamId", "==", teamId.trim()),
      where("state", "==", 1)
    );
    const querySnapshot = await getDocs(q);
    setTasksCount(querySnapshot.size);
  };

  const logOut = async () => {
    const q = query(collection(db, "session"), where("userId", "==", user.id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      const session = doc.data();
      session.id = doc.id;
      await updateSession(session);
    });
  };
  const updateSession = async (session) => {
    const date =
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate();
    const date1 = new Date(`${date} ${session.loginTime}`);
    const date2 = new Date(`${date} ${new Date().toLocaleTimeString()}`);
    console.log(date1);
    console.log(date2);
    const timeDifference = date2 - date1;
    const hours = Math.floor(timeDifference / 3600000);
    const minutes = Math.floor((timeDifference % 3600000) / 60000);
    const seconds = Math.floor(((timeDifference % 360000) % 60000) / 1000);
    console.log(timeDifference);
    await updateDoc(doc(db, "session", session.id), {
      logoutTime: new Date().toLocaleTimeString(),
      hours: hours + ":" + minutes + ":" + seconds,
    });
  };

  return (
    <View className="bg-[#fff] h-full w-full items-center">
      {/*Navbar*/}
      <View
        className="bg-[#6F47EB] w-full h-24 items-center justify-around flex-row px-2 shadow"
        style={styles.container}
      >
        <View className="w-1/4 h-full">
          <TouchableOpacity
            className=" flex-1 items-center justify-center"
            onPress={() => {
              props.navigation.navigate("HomeUsers");
            }}
          >
            <Image
              source={require("../assets/logoUnivalle.png")}
              className="h-14"
              style={{ width: "100%", resizeMode: "contain" }}
            />
          </TouchableOpacity>
        </View>
        <View className="w-2/4 h-full flex-row justify-around">
          <TouchableOpacity
            className="w-1/2 h-full justify-center border-b-4 border-white"
            onPress={() => {
              props.navigation.navigate("HomeUsers");
            }}
          >
            <Text className="text-white text-sm lg:text-lg font-bold text-center">
              Inicio
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-1/2 h-full justify-center"
            onPress={() => {
              props.navigation.navigate("TasksUsers");
            }}
          >
            <Text className="text-white text-sm lg:text-lg font-bold text-center">
              Tareas
            </Text>
          </TouchableOpacity>
        </View>
        <View className="w-1/4 h-full">
          <TouchableOpacity
            className="h-full items-center justify-center"
            onPress={() => {
              props.navigation.navigate("Profile");
            }}
          >
            <View className="h-12 w-12 rounded-full object-contain resize">
              <FontAwesome name="user-circle-o" size={48} color="#FFF" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/*Contenido de Tareas*/}
      <View className="border-[#e7e7e6] border rounded w-11/12 h-5/6 my-5 shadow p-1 bg-white">
        <View className="flex-row justify-between items-center border-b-2 border-[#e7e7e6] py-3">
          {/*Tareas pendientes*/}
          <View className="w-1/2 flex-row items-center justify-center">
            <View className="w-12 h-12 border-2 border-[#6F47EB] rounded-full justify-center items-center">
              <AntDesign name="book" size={30} color="#6F47EB" />
            </View>
            <View className="ml-1">
              <Text className="text-[#9e9e9e] text-xs font-bold">
                Tareas pendientes
              </Text>
              <Text className="text-[#232323] text-lg font-bold">
                {tasksCount}
              </Text>
            </View>
          </View>
          {/*Horas*/}
          <View className="w-1/2 flex-row items-center justify-center border-l-2 border-[#e7e7e6]">
            <View className="w-12 h-12 border-2 border-[#6F47EB] rounded-full items-center justify-center">
              <AntDesign name="clockcircleo" size={32} color="#6F47EB" />
            </View>
            <View className="ml-1">
              <Text className="text-[#9e9e9e] text-xs font-bold">
                Tiempo total
              </Text>
              <Text className="text-[#232323] text-lg font-bold">00:00:00</Text>
            </View>
          </View>
        </View>
        <ScrollView
          className="flex-1 w-full h-11/12"
          showsVerticalScrollIndicator={false}
        >
          {tasks.map((task, index) => {
            return (
              <TaskCard
                key={index}
                task={task}
                onPress={() => showModal(task)}
                className="w-max h-20"
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeUsers;

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
});
