import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import db from "../database/firebase";
import React, { useContext, useEffect, useState } from "react";
import Constants from 'expo-constants';
import TaskCard from "../components/TaskCard";
import { AppContext } from "../AppContext";
import { AntDesign } from '@expo/vector-icons';

const TasksUsers = (props) => {
  const { globalData } = useContext(AppContext);
  const { user } = globalData;
  const [tasks, setTasks] = useState([]);
  const {teamId} = user;

  useEffect(() => {
    const q = query(collection(db, "tasks"), where("teamId", "==", teamId.trim()), where("state", "==", 1));
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
    props.navigation.navigate("ModalTaskUser", { taskData });
  };

  return (
    <View className="bg-[#fff] h-full w-full items-center">
      <View className="bg-[#6F47EB] w-full h-24 items-center justify-around flex-row px-2 shadow" style={styles.container}>
        <View className="w-1/4 h-full">
          <TouchableOpacity
            className=" flex-1 items-center justify-center"
            onPress={() => {props.navigation.navigate("HomeUsers")}}
          >
            <Image source={require('../assets/logoUnivalle.png')} className="h-14" style={{width: '100%', resizeMode:"contain"}}/>
          </TouchableOpacity>
        </View>
        <View className="w-2/4 h-full flex-row justify-around">
          <TouchableOpacity className="w-1/2 h-full justify-center"
            onPress={() => {props.navigation.navigate("HomeUsers")}}
          >
            <Text className="text-white text-sm lg:text-lg font-bold text-center">Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/2 h-full justify-center border-b-4 border-white"
            onPress={() => {props.navigation.navigate("TasksUsers")}}
          >
            <Text className="text-white text-sm lg:text-lg font-bold text-center">Tareas</Text>
          </TouchableOpacity>
        </View>
        <View className="w-1/4">
          <TouchableOpacity className="h-full items-center justify-center"
            onPress={() => {props.navigation.navigate("Profile")}}
          >
            <Image source={{uri: "https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg"}} className="h-12 w-12 rounded-full"/>
          </TouchableOpacity>
        </View>
      </View>
      {/*Contenido de Tareas*/}
      <View className="border-[#e7e7e6] border rounded w-11/12 h-5/6 my-5 shadow p-1">
        {/*Barra superior*/}
        <View className="h-20 flex-row justify-around items-center border-b-2 border-[#e7e7e6]">
          {/*Tareas pendientes*/}
          <TouchableOpacity className="w-1/2 h-full flex-col md:flex-row items-center justify-center py-3"
          >
            <View className='w-8 h-8 border-2 border-[#6F47EB] rounded-full justify-center items-center'>
              <AntDesign name="pushpino" size={20} color="#6F47EB" />
            </View>
            <View className="ml-1">
              <Text className="text-[#232323] text-base font-bold">Pendientes</Text>
            </View>
          </TouchableOpacity>
          {/*Tareas completadas*/}
          <TouchableOpacity className="w-1/2 h-full flex-col md:flex-row items-center justify-center py-3 border-l-2 border-[#e7e7e6]"
          >
            <View className='w-8 h-8 border-2 border-[#6F47EB] rounded-full justify-center items-center'>
              <AntDesign name="check" size={20} color="#6F47EB" />
            </View>
            <View className="ml-1">
              <Text className="text-[#232323] text-base font-bold">Finalizadas</Text>
            </View>
          </TouchableOpacity>
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

export default TasksUsers;

const styles = StyleSheet.create({
  container: {
      paddingTop: Constants.statusBarHeight,
  }
});