import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, ScrollView, } from "react-native";
import { collection, query, where, onSnapshot, orderBy, } from "firebase/firestore";
import db from "../database/firebase";
import Constants from 'expo-constants';
import CoordinatorCard from "../components/CoordinatorCard";
import { FontAwesome , AntDesign, SimpleLineIcons } from "@expo/vector-icons";

const Coordinators = (props) => {
  const [users, setUsers] = useState([]);

  // Obtenemos a los coordinadores
  useEffect(() => {
    const q = query(collection(db, "coordinators"), orderBy("name", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const usersData = [];
      querySnapshot.forEach((doc) => {
        const user = doc.data();
        user.id = doc.id;
        usersData.push(user);
      });
      setUsers(usersData);
    });
    return unsubscribe;
  }, []);
  const showModal = (userData) => {
    props.navigation.navigate("ModalCoordinator", { userData });
  };

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
          <TouchableOpacity className="w-1/2 h-full justify-center"
            onPress={() => {props.navigation.navigate("HomeAdmins")}}
          >
            <Text className="text-white text-sm lg:text-lg font-bold text-center">Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/2 h-full justify-center border-b-4 border-white"
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
      {/* Contenido de Usuarios */}
      <View className="bg-white border-[#e7e7e6] border rounded w-11/12 h-5/6 my-5 shadow p-1">
        {/*Barra superior*/}
        <View className="h-20 flex-row justify-around items-center border-b-2 border-[#e7e7e6]">
          {/*Agregar Usuarios*/}
          <TouchableOpacity className="w-full h-full flex-col md:flex-row items-center justify-center py-3"
            onPress={() => props.navigation.navigate("AddCoordinator")}
          >
            <View className='w-8 h-8 border-2 border-[#6F47EB] rounded-full justify-center items-center'>
              <SimpleLineIcons name="user-follow" size={20} color="#6F47EB" />
            </View>
            <View className="ml-1">
              <Text className="text-[#232323] text-base font-bold">Agregar Coordinador</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/*Contenido*/}
        <ScrollView className="w-full h-full">
          {users.map((user, index) => (
            <CoordinatorCard
              key={index}
              userData={user}
              screen="Coordinators"
              onPress={() => showModal(user)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Coordinators;

const styles = StyleSheet.create({
  container: {
      paddingTop: Constants.statusBarHeight,
  },
});