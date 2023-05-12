import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Modal,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import * as DocumentPicker from "expo-document-picker";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import db from "../database/firebase";
import storage from "../database/storage";

const fileIcons = {
  pdf: require("../images/icons8-cloud-file-64.png"),
  doc: require("../images/icons8-cloud-file-64.png"),
  mp4: require("../images/icons8-cloud-file-64.png"),
  mp3: require("../images/icons8-cloud-file-64.png"),
  zip: require("../images/icons8-cloud-file-64.png"),
};


const TaskModal = (props) => {
  const { taskData } = props.route.params; // obtén los datos del equipo desde las props
  const [modalVisible, setModalVisible] = useState(false);
  const [taskStatus, setTaskStatus] = useState(taskData.state);
  const [timeRemaining, setTimeRemaining] = useState(""); // Agrega el estado para el tiempo restante
  const { id } = taskData;
  // console.log("taskData", taskData.endDate.toDate());

  // Calcula el tiempo restante que tiene el usuario para completar la tarea
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
        const path = `files/${name}`;
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

        setFile({ uri: url, name: name , icon : fileIcons.mp3});
        setUploading(false);
      }
    } catch (error) {
      console.error("Error uploading file: ", error);
      setUploading(false);
    }
  };

  

  return (
    <SafeAreaView className="flex-1 bg-[#6F47EB]">
      <View className="items-center p-5">
        <Text className="text-white text-4xl font-bold text-center">
          {taskData.title}
        </Text>
      </View>
      <View className="flex-row items-center justify-between px-4 space-x-1">
        <Text className="text-white text-2xl font-bold">Description</Text>
      </View>
      {/* description display */}
      <View className="flex-row items-center justify-between px-4 space-x-1">
        <Text className="text-white text-lg">{taskData.description}</Text>
      </View>
      <View className="flex-row items-center justify-between px-4 space-x-1">
        <Text className="text-white text-lg">{timeRemaining} remaining</Text>
      </View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="bg-white py-2 px-4 mt-4 mx-4 rounded-md"
      >
        <Text className="text-black font-bold">Finish Task</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => editTask()}
        className="bg-white py-2 px-4 mt-4 mx-4 rounded-md"
      >
        <Text className="text-black font-bold">Edit Task</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View className="flex-1 justify-center items-center bg-gray-950 opacity-90">
          <View className="bg-white rounded-xl p-5 w-80 opacity-100">
            <TextInput
              className="border-2 border-black rounded-md p-2 mb-4"
              placeholder={file ? file.name : "Select file..."}
              editable={false}
              placeholderTextColor="black"
            />
            <Image source={file ? file.icon : null} style={{ width: 50, height: 50 }} />

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
    </SafeAreaView>
  );
};

export default TaskModal;
