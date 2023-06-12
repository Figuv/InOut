import { View, Text, Image, ScrollView, Modal, TextInput, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Platform, } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, query, onSnapshot, updateDoc, doc, where, getDocs, } from "firebase/firestore";
import * as DocumentPicker from "expo-document-picker";
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable, } from "firebase/storage";
import storage from "../database/storage";
import db from "../database/firebase";
import Constants from 'expo-constants';
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

const Tasks = (props) => {
  const { taskData } = props.route.params; // obtén los datos del equipo desde las props
  const { user } = props.route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [taskStatus, setTaskStatus] = useState(taskData.state);
  const [timeRemaining, setTimeRemaining] = useState(""); // Agrega el estado para el tiempo restante
  const { id } = taskData;

  useEffect(() => {
    const now = new Date();
    const endDate = new Date(taskData.endDate.toDate());
    const timeDifference = endDate - now;
    const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursRemaining = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutesRemaining = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    setTimeRemaining(
      `${daysRemaining} days, ${hoursRemaining} hours, ${minutesRemaining} minutes`
    );
  }, []);

  // Actualiza el estado de la tarea marcandola como completada
  const updateTaskStatus = async () => {
    try {
      const docRef = doc(db, "tasks", id);
      await updateDoc(docRef, { state: 0 });
      setTaskStatus("done");
      setModalVisible(false);
      props.navigation.goBack();
      console.log("Document updated successfully!");
    } catch (error) {
      console.error("Error updating task status: ", error);
    }
  };

  //Open tho modal EditTask
  const editTask = () => {
    props.navigation.navigate("ModalEditTask", { taskData });
  };

  //upload image
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });

      if (result.type !== "cancel") {
        const { uri, name } = result;
        const newUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;
        const path = `${user.id}/${id}/${name}`;
        // const fileRef = ref(storage, path);
        const fileRef = ref(storage, path);

        setUploading(true);

        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function () {
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", newUri, true);
          xhr.send(null);
        });

        const snapshot = await uploadBytesResumable(fileRef, blob);
        const url = await getDownloadURL(snapshot.ref);

        console.log("url", url);

        // const snapshot = await uploadBytes(fileRef, uri);
        // const url = await getDownloadURL(snapshot.ref);

        setFile({ uri: url, name: name });
        setUploading(false);
      }
    } catch (error) {
      console.error("Error uploading file: ", error);
      setUploading(false);
    }
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
          <TouchableOpacity className="w-1/5 h-full text-center justify-center items-center border-b-4 border-white"
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
      <View className="border-[#e7e7e6] border rounded w-11/12 h-5/6 my-5 shadow p-1">
      <View className="items-center">
          <Text className="text-[#343a40] text-2xl font-bold text-center">{taskData.title}</Text>
        </View>
        <View className="flex-row items-center justify-between px-4 space-x-1 mt-2">
          <View>
            <Text className="text-[#343a40] text-sm">Asignada: {taskData.startDate.toDate().toDateString()}</Text>
            <Text className="text-[#343a40] text-sm">Finaliza: {taskData.endDate.toDate().toDateString()}</Text>
          </View>
        </View>
      {/* description display */}
      <View className="px-4 mt-2">
          <Text className="text-black font-bold">Descripción</Text>
          <Text className="text-[#343a40] text-base">{taskData.description}</Text>
        </View>
      <View className="items-center justify-between px-4 space-x-1">
        <Text className="text-black font-bold text-start">Tiempo restante:</Text>
        <Text className="text-black text-lg">{timeRemaining}</Text>
      </View>
      <View className="flex-row w-full justify-around mt-5">
        <TouchableOpacity
          onPress={() => editTask()}
          className="bg-[#6F47EB] py-2 px-4 rounded-md w-2/5"
        >
          <Text className="text-white font-bold text-center">Editar Tarea</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="bg-red-500 py-2 px-4 rounded-md w-2/5"
        >
          <Text className="text-white font-bold text-center">Terminar Tarea</Text>
        </TouchableOpacity>
      </View>
      

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View className="flex-1 justify-center items-center bg-gray-950 opacity-90">
          <View className="bg-white rounded-xl p-5 w-80 opacity-100">
            {/*
            <TextInput
              className="border-2 border-black rounded-md p-2 mb-4"
              placeholder={file ? file.name : "Select file..."}
              editable={false}
              placeholderTextColor="black"
            />
            <Image
              source={file ? file.icon : null}
              style={{ width: 50, height: 50 }}
            />

            {uploading ? (
              <Text>Uploading file...</Text>
            ) : (
              <TouchableOpacity
                className="bg-gray-400 py-2 px-4 mb-4 rounded-md"
                onPress={handleUpload}
              >
                <Text className="text-white font-bold text-center">
                  Select file
                </Text>
              </TouchableOpacity>
            )}
            */}
            <View className="flex flex-row justify-between">
              <TouchableOpacity
                className="bg-black py-2 px-4 mr-4 rounded-md"
                onPress={updateTaskStatus}
              >
                <Text className="text-white font-bold text-center">Finish</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-red-500 py-2 px-4 rounded-md"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-white font-bold text-center">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      </View>
    </View>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  container: {
      paddingTop: Constants.statusBarHeight,
      flexGrow: 1,
  }
});