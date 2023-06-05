import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, } from "react-native";
import { collection, query, where, onSnapshot, deleteDoc, doc, updateDoc, } from "firebase/firestore";
import db from "../database/firebase";
import Constants from 'expo-constants';
import { MaterialCommunityIcons, AntDesign, } from "@expo/vector-icons";

const EditUserModal = (props) => {
  const { userData } = props.route.params;
  const { id } = userData;
  const [userName, setUserName] = useState(userData.name);
  const [userEmail, setUserEmail] = useState(userData.email);
  const [userHours, setUserHours] = useState(userData.hours);

  //do the logic to the function editTeam
  const editUser = async () => {
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, {
      name: userName,
      email: userEmail,
      hours: userHours,
    });
    props.navigation.navigate("Users");
  };

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
          {/* <TouchableOpacity className="w-1/5 h-full text-center justify-center items-center"
            onPress={() => props.navigation.navigate("Hours")}
          >
            <AntDesign name="clockcircleo" size={24} color="white"/>
            <Text className="text-white text-xs md:text-lg font-bold">Horas</Text>
          </TouchableOpacity> */}
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
      {/* Contenido */}
      <View className="bg-white border-[#e7e7e6] border rounded w-11/12 h-5/6 my-5 shadow">
        {/* Formulario */}
        <View className="w-full h-full items-center px-4">
          {/* Header */}
          <View className="w-full flex-row my-4 items-center">
            {/* Boton retroceder */}
            <TouchableOpacity className="w-1/5 rounded-lg p-1 justify-center items-center"
              onPress={() => {props.navigation.goBack();}}
            >
              <AntDesign name="arrowleft" size={24} color="#6F47EB" />
            </TouchableOpacity>
            <Text className="w-3/5 text-black font-black text-2xl text-center">Editar Usuario</Text>
          </View>
          <View className="items-center">
            {/* Renderizar los campos editables */}
            <View className="items-center px-4">
              <Text className="text-black text-lg font-bold">Nombre</Text>
              <TextInput
                className="bg-white rounded-2xl w-80 lg:w-96 h-12 px-4 font-bold mb-2 border border-[#e7e7e6]"
                placeholder="Nombre de Usuario"
                value={userName}
                onChangeText={(text) => setUserName(text)}
              />
            </View>
            <View className="items-center px-4">
              <Text className="text-black text-lg font-bold">Correo Electronico</Text>
              <TextInput
                className="bg-white rounded-2xl w-80 lg:w-96 h-12 px-4 font-bold mb-2 border border-[#e7e7e6]"
                placeholder="Correo Electronico"
                value={userEmail}
                onChangeText={(text) => setUserEmail(text)}
              />
            </View>
            <View className="items-center px-4">
              <Text className="text-black text-lg font-bold">Horas de Beca</Text>
              <TextInput
                className="rounded-2xl w-80 lg:w-96 h-12 px-4 font-bold border border-[#e7e7e6]"
                placeholder="Horas de Beca"
                value={userHours}
                onChangeText={(text) => setUserHours(text)}
                keyboardType="numeric"
              ></TextInput>
            </View>
            {/* Botones de guardar y cancelar */}
            <View className="w-80 lg:w-96 flex-row items-center justify-around mt-5 space-x-3">
              <TouchableOpacity
                onPress={() => {
                  editUser();
                }}
                className="bg-[#6F47EB] rounded-2xl w-36 h-12 justify-center items-center shadow-lg"
              >
                <Text className="text-white text-lg font-bold">Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.goBack();
                }}
                className="bg-[#EC2008] rounded-2xl w-36 h-12 justify-center items-center shadow-lg"
              >
                <Text className="text-white text-lg font-bold">Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EditUserModal;

const styles = StyleSheet.create({
  container: {
      paddingTop: Constants.statusBarHeight,
  },
});