import { View, Text, StyleSheet, ScrollView, Modal, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image, Linking, } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, query, onSnapshot, updateDoc, doc, where, getDoc, getDocs, } from "firebase/firestore";
import * as DocumentPicker from "expo-document-picker";
import { ref, listAll, uploadBytes, getDownloadURL, uploadBytesResumable, } from "firebase/storage";
import db from "../database/firebase";
import UserCard from "./UserCard";
import storage from "../database/storage";
import Constants from 'expo-constants';
import { MaterialCommunityIcons, AntDesign, } from "@expo/vector-icons";

const CoordinatorTaskModal = (props) => {
  const { taskData } = props.route.params; // obtén los datos del equipo desde las props
  const [modalVisible, setModalVisible] = useState(false);
  const [taskStatus, setTaskStatus] = useState('Espere...');
  const { id } = taskData;
  const [users, setUsers] = useState([]);
  const { teamId } = taskData;
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(null);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const q = query(collection(db, "users"), where("teamId", "==", teamId));
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
      } catch (error) {
        console.log("Error getting users: ", error);
      }
    };

    getUsers();
  }, []);

  const handleFileSelect = async (user) => {
    setModalVisible(true);
    const folderRef = ref(storage, `${user.id}/${id}/`);

    try {
      const { items } = await listAll(folderRef);

      const fileUrls = await Promise.all(
        items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return url;
        })
      );

      console.log("URLs de los archivos en la carpeta:", fileUrls);

      if (fileUrls.length > 0) {
        setSelectedFileUrl(fileUrls[0]);
        setSelectedFileName(extractFileNameFromUrl(fileUrls[0]));
      }
      else
      {
        setTaskStatus('No hay archivos adjuntos');
      }
    } catch (error) {
      console.error("Error al obtener los archivos de la carpeta:", error);
    }
  };

  const extractFileNameFromUrl = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  const handleDownloadFile = () => {
    if (selectedFileUrl) {
      Linking.openURL(selectedFileUrl);
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
          <TouchableOpacity className="w-1/5 h-full text-center justify-center items-center"
            onPress={() => props.navigation.navigate("Users")}
          >
            <MaterialCommunityIcons name="account-tie-outline" size={28} color="white" />
            <Text className="text-white text-xs md:text-lg font-bold">Estudiantes</Text>
          </TouchableOpacity>
          {/* Grupos */}
          <TouchableOpacity className="w-1/5 h-full text-center justify-center items-center border-b-4 border-white"
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
        <View className="flex-col items-center justify-center">
          {/* Header */}
          <View className="w-full flex-row my-4 items-center">
            {/* Boton retroceder */}
            <TouchableOpacity className="w-1/5 rounded-lg p-1 justify-center items-center"
              onPress={() => {props.navigation.goBack();}}
            >
              <AntDesign name="arrowleft" size={24} color="#6F47EB" />
            </TouchableOpacity>
            <Text className="w-3/5 text-black font-black text-2xl text-center">Usuarios de la tarea</Text>
          </View>
          {/* Lista de usuarios */}
          <View className="w-full h-5/6">
            <ScrollView>
            {users.map((user, index) => (
              <UserCard
                key={index}
                userData={user}
                screen="Users"
                onPress={() => handleFileSelect(user)}
              />
            ))}
            </ScrollView>
          </View>
        </View>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
            <View style={{ backgroundColor: "white", borderRadius: 20, padding: 20, width: 300 }}>
              <TextInput
                style={{ borderWidth: 2, borderColor: "black", borderRadius: 5, padding: 10, marginBottom: 10 }}
                placeholder={selectedFileName || taskStatus}
                editable={false}
                placeholderTextColor="black"
              />
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <TouchableOpacity
                  style={{ backgroundColor: "red", padding: 10, borderRadius: 5 }}
                  onPress={() => [setModalVisible(false), setSelectedFileUrl(null), setSelectedFileName(null)]}
                >
                  <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Cancelar</Text>
                </TouchableOpacity>
                {selectedFileUrl && (
                  <TouchableOpacity
                    className="bg-[#6F47EB]"
                    style={{ padding: 10, borderRadius: 5 }}
                    onPress={handleDownloadFile}
                  >
                    <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Descargar</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default CoordinatorTaskModal;

const styles = StyleSheet.create({
  container: {
      paddingTop: Constants.statusBarHeight,
  },
});