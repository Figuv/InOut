import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import db from "../database/firebase";
import Constants from "expo-constants";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

const CoordinatorModal = (props) => {
  const { userData } = props.route.params;
  const { id } = userData;
  const [sessions, setSessions] = useState([]);
  const [hours, setHours] = useState("");

  //Get sessions of the user
  useEffect(() => {
    const q = query(
      collection(db, "session"),
      where("userId", "==", id.trim())
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const sessions = [];
      querySnapshot.forEach((doc) => {
        const session = doc.data();
        session.id = doc.id;
        sessions.push(session);
      });
      setSessions(sessions);
    });
    return unsubscribe;
  }, []);

  //Get total hours of the user
  useEffect(() => {
    const q = query(
      collection(db, "session"),
      where("userId", "==", id.trim())
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let totalHours = 0;
      querySnapshot.forEach((doc) => {
        const session = doc.data();
        session.id = doc.id;
        totalHours += session.hours;
      });
      setHours(totalHours);
    });
    return unsubscribe;
  }, []);

  //Edit user open modal
  const editUser = () => {
    props.navigation.navigate("EditCoordinatorModal", { userData });
  };

  //Delete user
  const deleteUser = async () => {
    const userRef = collection(db, "coordinators");
    deleteDoc(doc(userRef, id))
      .then(() => {
        console.log("Coordinador eliminado correctamente");
        props.navigation.goBack();
      })
      .catch((error) => {
        console.error("Error eliminando al coordinardor: ", error);
      });
  };

  return (
    <View className="bg-[#f8f9fa] h-full w-full items-center">
      {/*Navbar*/}
      <View
        className="bg-[#6F47EB] w-full h-24 items-center justify-around flex-row px-2 shadow"
        style={styles.container}
      >
        <View className="w-1/4 h-full">
          <TouchableOpacity
            className=" flex-1 items-center justify-center"
            onPress={() => {
              props.navigation.navigate("HomeAdmins");
            }}
          >
            <Image
              source={require("../assets/logoUnivalle.png")}
              className="h-14"
              style={{ width: "100%", resizeMode: "contain" }}
            />
          </TouchableOpacity>
        </View>
        <View className="w-2/4 h-full flex-row justify-around">
          <TouchableOpacity
            className="w-1/2 h-full justify-center"
            onPress={() => {
              props.navigation.navigate("HomeAdmins");
            }}
          >
            <Text className="text-white text-sm lg:text-lg font-bold text-center">
              Inicio
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-1/2 h-full justify-center border-b-4 border-white"
            onPress={() => {
              props.navigation.navigate("Coordinators");
            }}
          >
            <Text className="text-white text-sm lg:text-lg font-bold text-center">
              Coordinadores
            </Text>
          </TouchableOpacity>
        </View>
        <View className="w-1/4 h-full">
          <TouchableOpacity
            className="h-full items-center justify-center"
            onPress={() => {
              props.navigation.navigate("Profile");
            }}
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
            <TouchableOpacity
              className="w-1/5 rounded-lg p-1 justify-center items-center lg:items-start lg:ml-4"
              onPress={() => {
                props.navigation.goBack();
              }}
            >
              <AntDesign name="arrowleft" size={24} color="#6F47EB" />
            </TouchableOpacity>
            <Text className="w-3/5 text-black font-black text-2xl text-center">
              Información
            </Text>
          </View>
          {/* Contenedor de los detalles */}
          <View className="w-full h-5/6 lg:flex-row">
            {/* Imagen del usuario*/}
            <View className="items-center lg:w-1/5">
              <View className="h-32 w-32 lg:w-60 lg:h-60 rounded">
                <FontAwesome name="user-circle-o" size={128} color="#6F47EB" />
              </View>
            </View>
            {/* Detalles del usuario*/}
            <View className="lg:ml-5 lg:w-3/5 h-5/6 space-y-3">
              <View className="h-5/6">
                <View className="flex-row">
                  <Text className="text-black text-base font-bold">
                    Nombre:{" "}
                  </Text>
                  <Text className="text-black text-base">{userData.name}</Text>
                </View>
                <View className="flex-row">
                  <Text className="text-black text-base font-bold">
                    Correo:{" "}
                  </Text>
                  <Text className="text-black text-base">{userData.email}</Text>
                </View>
                <View className="flex-row">
                  <Text className="text-black text-base font-bold">
                    Horas de beca:{" "}
                  </Text>
                  <Text className="text-black text-base">{userData.hours}</Text>
                </View>
                <View className="flex-row">
                  <Text className="text-black text-base font-bold">
                    Horas trabajadas:{" "}
                  </Text>
                  <Text className="text-black text-base">{userData.hours}</Text>
                </View>
              </View>
              <View className="w-full flex-row items-center justify-around lg:justify-start space-x-3">
                <TouchableOpacity
                  className="bg-[#6F47EB] rounded-2xl w-2/5 lg:w-1/5 h-12 justify-center items-center shadow-lg"
                  onPress={() => editUser()}
                >
                  <Text className="text-white text-lg font-bold">Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-[#EC2008] rounded-2xl w-2/5 lg:w-1/5 h-12 justify-center items-center shadow-lg"
                  onPress={() => deleteUser()}
                >
                  <Text className="text-white text-lg font-bold">Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CoordinatorModal;

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
});
