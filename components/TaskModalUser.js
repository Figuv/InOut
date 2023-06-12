import { View, Text, Image, ScrollView, Modal, TextInput, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Platform, } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { collection, query, onSnapshot, updateDoc, doc, where, getDocs, } from "firebase/firestore";
import * as DocumentPicker from "expo-document-picker";
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable, } from "firebase/storage";
import storage from "../database/storage";
import db from "../database/firebase";
import Constants from 'expo-constants';
import { AppContext } from "../AppContext";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

const Tasks = (props) => {
  const { taskData } = props.route.params; // obtén los datos del equipo desde las props
  const { globalData } = useContext(AppContext);
  const { user } = globalData;
  const [modalVisible, setModalVisible] = useState(false);
  const [taskStatus, setTaskStatus] = useState(taskData.state);
   const [timeRemaining, setTimeRemaining] = useState("");
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
      const userTaskQuerySnapshot = await getDocs(
        query(
          collection(db, "user_task"),
          where("taskId", "==", id.trim()),
          where("userId", "==", user.id.trim())
        )
      );
  
      const updatePromises = userTaskQuerySnapshot.docs.map(async (doc) => {
        const userTaskRef = doc.ref;
        await updateDoc(userTaskRef, { state: 0 });
      });
  
      await Promise.all(updatePromises);
      props.navigation.goBack();
  
      console.log("Documents updated successfully!");
    } catch (error) {
      console.error("Error updating task status:", error);
    }
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
      <View className="bg-[#6F47EB] w-full h-24 items-center justify-around flex-row px-2 shadow" style={styles.container}>
        <View className="w-1/4 h-full">
          <TouchableOpacity
            className=" flex-1 items-center justify-center"
            onPress={() => {props.navigation.navigate("HomeUsers")}}
          >
            <Image source={require('../assets/logoUnivalle.png')} className="h-14" style={{width: '100%', resizeMode:"contain"}}/>
          </TouchableOpacity>
        </View>
        <View className="w-2/4 h-full flex-row justify-around">
          <TouchableOpacity className="w-1/2 h-full justify-center"
            onPress={() => {props.navigation.navigate("HomeUsers")}}
          >
            <Text className="text-white text-lg font-bold text-center">Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/2 h-full justify-center border-b-4 border-white"
            onPress={() => {props.navigation.navigate("TasksUsers")}}
          >
            <Text className="text-white text-lg font-bold text-center">Tareas</Text>
          </TouchableOpacity>
        </View>
        <View className="w-1/4">
          <TouchableOpacity className="h-full items-center justify-center"
            onPress={() => {props.navigation.navigate("Profile")}}
          >
            <Image source={{uri: "https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg"}} className="h-12 w-12 rounded-full"/>
          </TouchableOpacity>
        </View>
      </View>
      <View className="border-[#e7e7e6] border rounded w-11/12 h-5/6 my-5 shadow p-1">
        {/* Header */}
        <View className="w-full flex-row my-4 items-center">
            {/* Boton retroceder */}
            <TouchableOpacity className="w-1/5 rounded-lg p-1 justify-center items-center"
              onPress={() => {props.navigation.goBack();}}
            >
              <AntDesign name="arrowleft" size={24} color="#6F47EB" />
            </TouchableOpacity>
          <Text className="text-[#343a40] text-2xl font-bold text-center">{taskData.title}</Text>
        </View>
        <View className="flex-row items-center justify-between px-4 space-x-1 mt-2">
          <View>
            <Text className="text-[#343a40] text-sm">Asignada: {taskData.startDate.toDate().toDateString()}</Text>
            <Text className="text-[#343a40] text-sm">Finaliza: {taskData.endDate.toDate().toDateString()}</Text>
          </View>
          <View className="flex-row items-center justify-center">
            <TouchableOpacity
              className="bg-[#6F47EB] py-2 px-4 rounded-md"
              onPress={() => setModalVisible(true)}
            >
              <Text className="text-white font-bold text-center">Entregar</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* description display */}
        <View className="px-4 mt-2">
          <Text className="text-black font-bold">Descripción</Text>
          <Text className="text-[#343a40] text-base">{taskData.description}</Text>
        </View>
        {/*
        <View className="px-4">
          <Text className="text-[#343a40] text-sm">{timeRemaining} remaining</Text>
        </View>
        */}
        <View className="w-full px-4 mt-6">
          <TouchableOpacity className="flex-row w-2/3"
            onPress={handleUpload}
          >
            <MaterialCommunityIcons name="clippy" size={24} color="#6F47EB" />
            <Text className="text-[#6F47EB] text-base">Adjuntar archivo y entregar</Text>
          </TouchableOpacity>
          <View>
            <View className="flex-row bg-[#e9ecef] mt-2 rounded items-center justify-between">
              <View className="flex-row items-center">
                <Image source={{uri: "https://blog.ida.cl/wp-content/uploads/sites/5/2020/04/tamano-redes-blog-655x470.png"}} className="h-12 w-12 rounded"/>
                <Text className="w-60 ml-3 font-bold">
                  {file ? file.name : "No file selected"}
                </Text>
              </View>
              <TouchableOpacity className=" bg-red-500 h-12 w-12 items-center justify-center rounded"
                onPress={() => setFile(null)}
              >
                <MaterialCommunityIcons name="trash-can-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
            {uploading ? (
                <Text>Uploading file...</Text>
              ) : 
              (
                <Text></Text>
              )}
          </View>
        </View>

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View className="flex-1 justify-center items-center bg-gray-950 opacity-90">
            <View className="bg-white rounded-xl p-5 w-80 opacity-100">
              <View className="flex flex-row justify-between">
                <TouchableOpacity
                  className="bg-black py-2 px-4 mr-4 rounded-md"
                  onPress={updateTaskStatus}
                >
                  <Text className="text-white font-bold text-center">Subir y entregar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-red-500 py-2 px-4 rounded-md"
                  onPress={() => setModalVisible(false)}
                >
                  <Text className="text-white font-bold text-center">Cancelar</Text>
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
  }
});