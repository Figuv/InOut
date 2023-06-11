import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "../database/firebase";
import Constants from 'expo-constants';
import { MaterialCommunityIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import { SHA256 } from "crypto-js";

const AddUser = (props) => {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [hours, setHours] = useState(0);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const hashPassword = (password) => {
    const hash = SHA256(password).toString();
    return hash;
  };

  const handleCreateAccount = async () => {
    console.log("Creating account...");

    if (email.length === 0 && hours > 0) {
      alert("Please enter an email");
    } else {
      try {
        await addDoc(collection(db, "users"), {
          name: name,
          email: email + "@est.univalle.edu",
          password: hashPassword(password),
          teamId: "",
          hours: hours,
        });
        props.navigation.navigate("Users");
      } catch (error) {
        console.log(error);
      }
    }
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
      {/* Contenido */}
      <View className="bg-white border-[#e7e7e6] border rounded w-11/12 h-5/6 my-5 shadow">
        {/* Informacion */}
        <View className="w-full h-full items-center px-4">
          {/* Header */}
          <View className="w-full flex-row my-4 items-center">
            {/* Boton retroceder */}
            <TouchableOpacity className="w-1/5 rounded-lg p-1 justify-center items-center lg:items-start lg:ml-4"
              onPress={() => {props.navigation.goBack();}}
            >
              <AntDesign name="arrowleft" size={24} color="#6F47EB" />
            </TouchableOpacity>
            <Text className="w-3/5 text-black font-black text-2xl text-center">Nuevo Usuario</Text>
          </View>
          <View>
            <View className="space-y-4 mb-60 items-center">
              <TextInput
                className="bg-[#f8f9fa] rounded-2xl w-80 lg:w-96 h-12 px-4 font-bold border border-[#e7e7e6]"
                placeholder="Nombre Completo"
                onChangeText={(text) => setName(text)}
              ></TextInput>
              <View className="bg-[#f8f9fa] rounded-2xl w-80 lg:w-96 flex-row border border-[#e7e7e6] items-center">
                <TextInput
                  className="w-3/5 h-12 px-4 font-bold"
                  placeholder="Correo Electronico"
                  autoCapitalize="none"
                  onChangeText={(text) => setEmail(text)}
                ></TextInput>
                <Text className="w-2/5 text-black font-bold justify-center">@est.univalle.edu</Text>
              </View>
              <TextInput
                className="bg-[#f8f9fa] rounded-2xl w-80 lg:w-96 h-12 px-4 font-bold border border-[#e7e7e6]"
                placeholder="Horas de Beca"
                onChangeText={(text) => setHours(text)}
                keyboardType="numeric"
              ></TextInput>
              <View className="bg-[#f8f9fa] rounded-2xl w-80 lg:w-96 flex-row border border-[#e7e7e6] items-center">
                <TextInput
                  className="w-4/5 h-12 px-4 font-bold"
                  placeholder="Contraseña"
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={!showPassword}
                ></TextInput>
                <TouchableOpacity className="w-1/5 h-12 justify-center items-center border-l border-[#e7e7e6] "
                  onPress={togglePasswordVisibility}
                >
                  <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={24} color="#6F47EB" />
                </TouchableOpacity>
              </View>
              {/* Boton de Creacion */}
              <View>
                <TouchableOpacity
                  className="bg-[#6F47EB] rounded-2xl w-80 h-12 justify-center items-center"
                  onPress={handleCreateAccount}
                >
                  <Text className="text-[#FFFFFF] font-bold text-2xl">Guardar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddUser;

const styles = StyleSheet.create({
  container: {
      paddingTop: Constants.statusBarHeight,
  }
});