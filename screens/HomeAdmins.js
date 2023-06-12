import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { collection, query, where, getDocs, doc, updateDoc, onSnapshot, } from "firebase/firestore";
import db from "../database/firebase";
import React, { useContext, useEffect, useState } from "react";
import Constants from 'expo-constants';
import { AppContext } from "../AppContext";
import { FontAwesome } from '@expo/vector-icons';

const HomeAdmins = (props) => {
  const { globalData } = useContext(AppContext);
  const { user } = globalData;
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "tasks"), where("state", "==", 1));
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

  return (
    <View className="bg-[#fff] h-full w-full items-center">
      {/*Navbar*/}
      <View className="bg-[#6F47EB] w-full h-24 items-center justify-around flex-row px-2 shadow" style={styles.container}>
        <View className="w-1/4 h-full">
          <TouchableOpacity
            className=" flex-1 items-center justify-center"
            onPress={() => {props.navigation.navigate("HomeAdmins")}}
          >
            <Image source={require('../assets/logoUnivalle.png')} className="h-14" style={{width: '100%', resizeMode:"contain"}}/>
          </TouchableOpacity>
        </View>
        <View className="w-2/4 h-full flex-row justify-around">
          <TouchableOpacity className="w-1/2 h-full justify-center border-b-4 border-white"
            onPress={() => {props.navigation.navigate("HomeAdmins")}}
          >
            <Text className="text-white text-sm lg:text-lg font-bold text-center">Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/2 h-full justify-center"
            onPress={() => {props.navigation.navigate("Coordinators")}}
          >
            <Text className="text-white text-sm lg:text-lg font-bold text-center">Coordinadores</Text>
          </TouchableOpacity>
        </View>
        <View className="w-1/4 h-full">
          <TouchableOpacity className="h-full items-center justify-center"
            onPress={() => {props.navigation.navigate("Profile")}}
          >
            <FontAwesome name="user-circle-o" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      {/*Contenido*/}
      <View className="border-[#e7e7e6] border rounded w-11/12 h-5/6 my-5 shadow p-1 bg-white">
        <View className="h-20 justify-between items-center border-b-2 border-[#e7e7e6] py-3">
          {/*Texto Bienvenida*/}
          <View className="w-full items-center justify-center">
            <Text className="text-[#232323] text-lg font-bold">{user.name}</Text>
            <Text className="text-[#7e7e7e] text-sm font-bold">Ahora te encuentras en la ventana de Administrador</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeAdmins;

const styles = StyleSheet.create({
  container: {
      paddingTop: Constants.statusBarHeight,
  }
});