import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground} from "react-native";
import { collection, query, where, getDocs, doc, updateDoc, onSnapshot, } from "firebase/firestore";
import db from "../database/firebase";
import Constants from 'expo-constants';
import { AppContext } from "../AppContext";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

const Home = (props) => {
  const { globalData } = useContext(AppContext);
  const { user } = globalData;

  return (
    <View className="bg-[#f8f9fa] h-full w-full items-center">
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
          <TouchableOpacity className="w-1/5 h-full text-center justify-center items-center border-b-4 border-white "
            onPress={() => props.navigation.navigate("Home")}
          >
            <MaterialCommunityIcons name="home-variant-outline" size={24} color="white" />
            <Text className="text-white text-xs md:text-lg font-bold">Inicio</Text>
          </TouchableOpacity>
          {/* Estudiantes */}
          <TouchableOpacity className="w-1/5 h-full text-center justify-center items-center"
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

export default Home;

const styles = StyleSheet.create({
  container: {
      paddingTop: Constants.statusBarHeight,
  },
});