import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, } from "react-native";
import { collection, query, where, onSnapshot, deleteDoc, doc, updateDoc, } from "firebase/firestore";
import db from "../database/firebase";
import Constants from 'expo-constants';
import { MaterialCommunityIcons, AntDesign, FontAwesome, } from "@expo/vector-icons";

const EditCoordinatorModal = (props) => {
  const { userData } = props.route.params;
  const { id } = userData;
  const [userName, setUserName] = useState(userData.name);
  const [userEmail, setUserEmail] = useState(userData.email);

  //do the logic to the function editTeam
  const editUser = async () => {
    const userRef = doc(db, "coordinators", id);
    await updateDoc(userRef, {
      name: userName,
      email: userEmail,
    });
    props.navigation.navigate("Coordinators");
  };

  return (
    <View className="bg-[#f8f9fa] h-full w-full items-center">
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
            <Text className="w-3/5 text-black font-black text-2xl text-center">Editar Coordinador</Text>
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
                autoCapitalize="none"
                onChangeText={(text) => setUserEmail(text)}
              />
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

export default EditCoordinatorModal;

const styles = StyleSheet.create({
  container: {
      paddingTop: Constants.statusBarHeight,
  },
});