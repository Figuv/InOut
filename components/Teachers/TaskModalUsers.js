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
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  doc,
  where,
  getDoc,
  getDocs,
} from "firebase/firestore";
import * as DocumentPicker from "expo-document-picker";
import {
  ref,
  listAll,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import db from "../../database/firebase";
import TaskUserCard from "./TaskUserCard";
import storage from "../../database/storage";

const TaskModalUsers = (props) => {
  const { taskData } = props.route.params; // obtén los datos del equipo desde las props
  const [modalVisible, setModalVisible] = useState(false);
  const [taskStatus, setTaskStatus] = useState(taskData.state);
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
    <View className="bg-[#6F47EB] h-full w-full items-center justify-center">
      <SafeAreaView>
        <View className="flex-col items-center justify-center">
          <View>
            <Text className="text-white font-black text-4xl">Users</Text>
          </View>
          <ScrollView>
            {users.map((user, index) => (
              <TaskUserCard
                key={index}
                userData={user}
                screen="Users"
                onPress={() => handleFileSelect(user)}
              />
            ))}
          </ScrollView>
        </View>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
            <View style={{ backgroundColor: "white", borderRadius: 20, padding: 20, width: 300 }}>
              <TextInput
                style={{ borderWidth: 2, borderColor: "black", borderRadius: 5, padding: 10, marginBottom: 10 }}
                placeholder={selectedFileName || "Getting file..."}
                editable={false}
                placeholderTextColor="black"
              />
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <TouchableOpacity
                  style={{ backgroundColor: "red", padding: 10, borderRadius: 5 }}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Cancel</Text>
                </TouchableOpacity>
                {selectedFileUrl && (
                  <TouchableOpacity
                    style={{ backgroundColor: "blue", padding: 10, borderRadius: 5 }}
                    onPress={handleDownloadFile}
                  >
                    <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Download</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
};

export default TaskModalUsers;
