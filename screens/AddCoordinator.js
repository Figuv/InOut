import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "../database/firebase";
import Constants from 'expo-constants';
import { Ionicons , AntDesign, FontAwesome, } from "@expo/vector-icons";
import { SHA256 } from "crypto-js";

const AddCoordinator = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const hashPassword = (password) => {
    const hash = SHA256(password).toString();
    return hash;
  };

  const handleCreateAccount = async () => {
    console.log("Creando la cuenta...");

    if (email.length === 0) {
      alert("Please enter an email");
    } else {
      try {
        await addDoc(collection(db, "coordinators"), {
          name: name,
          email: email + "@cor.univalle.edu",
          password: hashPassword(password),
        });
        props.navigation.navigate("Coordinators");
      } catch (error) {
        console.log(error);
      }
    }
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
            <Text className="w-3/5 text-black font-black text-2xl text-center">Nuevo Coordinador</Text>
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
                <Text className="w-2/5 text-black font-bold justify-center">@cor.univalle.edu</Text>
              </View>
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

export default AddCoordinator;

const styles = StyleSheet.create({
  container: {
      paddingTop: Constants.statusBarHeight,
  }
});