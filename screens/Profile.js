import { View, Text, Image, Modal, StyleSheet, TouchableOpacity, } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';
import React, { useEffect, useState, useContext, } from "react";
import { collection, query, onSnapshot, updateDoc, doc, where, getDocs, } from "firebase/firestore"; // Importa la función updateDoc para actualizar la tarea en Firestore
import { AppContext } from "../AppContext";
import db from "../database/firebase";
import { FontAwesome } from '@expo/vector-icons';

const Profile = (props) => {
  const { globalData } = useContext(AppContext);
  const { user } = globalData;

  // Función para cerrar sesión
  const logOut = async () => {
    console.log(user);
    if(user.role === "Administrador" || user.role === "Coordinador"){
      props.navigation.navigate("Login");
    }
    else{
      const q = query(collection(db, "session"), where("userId", "==", user.id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        const session = doc.data();
        session.id = doc.id;
        await updateSession(session);
      });
      props.navigation.navigate("Login");
    }
  };

  //Establece el tiempo de la sesión del usuario al cerrar sesión
  const updateSession = async (session) => {
    const date =
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate();
    const date1 = new Date(`${date} ${session.loginTime}`);
    const date2 = new Date(`${date} ${new Date().toLocaleTimeString()}`);
    const timeDifference = date2 - date1;
    const hours = Math.floor(timeDifference / 3600000);
    const minutes = Math.floor((timeDifference % 3600000) / 60000);
    const seconds = Math.floor(((timeDifference % 360000) % 60000) / 1000);
    // console.log(timeDifference);
    await updateDoc(doc(db, "session", session.id), {
      logoutTime: new Date().toLocaleTimeString(),
      hours: hours + ":" + minutes + ":" + seconds,
    });
  };
  
  return (
    <View className="bg-[#6F47EB] w-full h-full justify-evenly" style={styles.container}>
      {/* Boton volver atras*/}
      <TouchableOpacity className="bg-white w-12 h-10 mx-5 items-center justify-center rounded"
        onPress={() => {props.navigation.goBack()}}
      >
        <AntDesign name="arrowleft" size={24} color="#6F47EB"/>
      </TouchableOpacity>
      {/* Contenedor del contenido*/}
      <View className="w-full h-5/6 p-5">
        {/* Contenedor de la tarjeta de informacion*/}
        <View className="bg-white h-full rounded p-5">
          <View className="w-full h-4/5 items-center">
            <View className="h-40 w-40 rounded-full shadow justify-center items-center">
              <FontAwesome name="user-circle-o" size={140} color="#6F47EB"/>
            </View>
            <View className="flex-row py-2">
              <Text className="text-black font-bold text-base">Rol: </Text>
              <Text className="text-black text-base">{user.role}</Text>
            </View>
            <View className="flex-row  py-2">
              <Text className="text-black font-bold text-base">Nombre: </Text>
              <Text className="text-black text-base">{user.name}</Text>
            </View>
            <View className="flex-row  py-2">
              <Text className="text-black font-bold text-base">Email: </Text>
              <Text className="text-black text-base">{user.email}</Text>
            </View>
          </View>
          {/* Contenedor de los botones*/}
          <View className="w-full h-1/5 items-center justify-end space-y-2">
            <TouchableOpacity
              onPress={logOut}
            >
              <Text className="bg-[#d62828] text-white font-bold text-lg p-2 rounded">Cerrar sesión</Text>
            </TouchableOpacity>
            <Text className="text-black text-sm">© Univalle 2022 - 3 Minutos con la biblia</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
  
export default Profile;  

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  }
});