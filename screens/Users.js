import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, ScrollView} from "react-native";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import db from "../database/firebase";
import Constants from 'expo-constants';
import UserCard from "../components/UserCard";
import { MaterialCommunityIcons, AntDesign, SimpleLineIcons } from "@expo/vector-icons";

const Users = (props) => {
  const [users, setUsers] = useState([]);

  // Get users
  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("name", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const usersData = [];
      querySnapshot.forEach((doc) => {
        // usersData.push(doc.data());
        const user = doc.data();
        user.id = doc.id; // agregar la propiedad "id" al objeto team
        usersData.push(user);
      });
      setUsers(usersData);
    });
    return unsubscribe;
  }, []);
  const showModal = (userData) => {
    props.navigation.navigate("ModalUser", { userData });
  };

  return (
    <View className="bg-[#fff] h-full w-full items-center">
      {/* Navbar */}
      <View className="bg-[#6F47EB] w-full h-24 items-center justify-around flex-row px-2 shadow" style={styles.container}>
        {/* Logo */}
        <View className="w-1/6 h-full">
          <TouchableOpacity
            className=" flex-1 items-center justify-center"
            onPress={() => {props.navigation.navigate("Home")}}
          >
            <Image source={require('../assets/logoUnivalle.png')} className="h-14" style={{width: '100%', resizeMode:"contain"}}/>
          </TouchableOpacity>
        </View>
        {/* Menu */}
        <View className="w-4/6 h-full flex-row justify-around px-2">
          {/* Inicio */}
          <TouchableOpacity className="w-1/5 h-full text-center justify-center items-center"
            onPress={() => props.navigation.navigate("Home")}
          >
            <MaterialCommunityIcons name="home-variant-outline" size={24} color="white" />
            <Text className="text-white text-xs md:text-lg font-bold">Inicio</Text>
          </TouchableOpacity>
          {/* Estudiantes */}
          <TouchableOpacity className="w-1/5 h-full text-center justify-center items-center border-b-4 border-white "
            onPress={() => props.navigation.navigate("Users")}
          >
            <MaterialCommunityIcons name="account-tie-outline" size={28} color="white" />
            <Text className="text-white text-xs md:text-lg font-bold">Estudiantes</Text>
          </TouchableOpacity>
          {/* Grupos */}
          <TouchableOpacity className="w-1/5 h-full text-center justify-center items-center"
            onPress={() => props.navigation.navigate("Teams")}
          >
            <MaterialCommunityIcons name="account-group-outline" size={28} color="white" />
            <Text className="text-white text-xs md:text-lg font-bold">Grupos</Text>
          </TouchableOpacity>
          {/* Tareas */}
          <TouchableOpacity className="w-1/5 h-full text-center justify-center items-center"
            onPress={() => props.navigation.navigate("Tasks")}
          >
            <AntDesign name="book" size={24} color="white"/>
            <Text className="text-white text-xs md:text-lg font-bold">Tareas</Text>
          </TouchableOpacity>
          {/* Horas */}
          <TouchableOpacity className="w-1/5 h-full text-center justify-center items-center"
            onPress={() => props.navigation.navigate("Hours")}
          >
            <AntDesign name="clockcircleo" size={24} color="white"/>
            <Text className="text-white text-xs md:text-lg font-bold">Horas</Text>
          </TouchableOpacity>
        </View>
        {/* Perfil */}
        <View className="w-1/6 h-full">
          <TouchableOpacity className="h-full items-center justify-center"
            onPress={() => {props.navigation.navigate("Profile")}}
          >
            <Image source={{uri: "https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg"}} className="h-12 w-12 rounded-full"/>
          </TouchableOpacity>
        </View>
      </View>
      {/* Contenido de Usuarios */}
      <View className="bg-white border-[#e7e7e6] border rounded w-11/12 h-5/6 my-5 shadow p-1">
        {/*Barra superior*/}
        <View className="h-20 flex-row justify-around items-center border-b-2 border-[#e7e7e6]">
          {/*Agregar Usuarios*/}
          <TouchableOpacity className="w-full h-full flex-col md:flex-row items-center justify-center py-3"
            onPress={() => props.navigation.navigate("AddUser")}
          >
            <View className='w-8 h-8 border-2 border-[#6F47EB] rounded-full justify-center items-center'>
              <SimpleLineIcons name="user-follow" size={20} color="#6F47EB" />
            </View>
            <View className="ml-1">
              <Text className="text-[#232323] text-base font-bold">Agregar Usuario</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/*Contenido*/}
        <ScrollView className="w-full h-full">
          {users.map((user, index) => (
            <UserCard
              key={index}
              userData={user}
              screen="Users"
              onPress={() => showModal(user)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
      paddingTop: Constants.statusBarHeight,
  },
});