import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
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
import DropDownPicker from "react-native-dropdown-picker";
import UserCard from "./UserCard";
import Constants from "expo-constants";
import { MaterialCommunityIcons, AntDesign, FontAwesome } from "@expo/vector-icons";

const HoursModal = (props) => {
  const { teamData } = props.route.params;
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const { id } = teamData;
  const [addUsers, setAddUsers] = useState([]);

  //Dorp down picker open and value
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  //Obtiene usuarios y tareas del equipo
  useEffect(() => {
    const q = query(collection(db, "users"), where("teamId", "==", ""));
    const t = query(
      collection(db, "tasks"),
      where("teamId", "==", id.trim()),
      where("state", "==", 1)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        const user = doc.data();
        user.id = doc.id;
        users.push(user);
      });
      setAddUsers(users);
    });
    const unsubscribeT = onSnapshot(t, (querySnapshot) => {
      const teamTask = [];
      querySnapshot.forEach((doc) => {
        const task = doc.data();
        task.id = doc.id;
        teamTask.push(task);
      });
      setTasks(teamTask);
    });
    return unsubscribe, unsubscribeT;
  }, []);

  //Get users of the team
  useEffect(() => {
    const q = query(collection(db, "users"), where("teamId", "==", id.trim()));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const members = [];
      querySnapshot.forEach((doc) => {
        const member = doc.data();
        member.id = doc.id;
        members.push(member);
      });
      setUsers(members);
    });
    return unsubscribe;
  }, []);

  //Show user hours list
  const showHours = (user) => {
    props.navigation.navigate("ModalListHours", { user });
  };

  return (
    <View className="bg-[#f8f9fa] h-full w-full items-center">
      {/* Navbar */}
      <View
        className="bg-[#6F47EB] w-full h-24 items-center justify-around flex-row px-2 shadow"
        style={styles.container}
      >
        {/* Logo */}
        <View className="w-1/6 h-full">
          <TouchableOpacity
            className=" flex-1 items-center justify-center"
            onPress={() => {
              props.navigation.navigate("Home");
            }}
          >
            <Image
              source={require("../assets/logoUnivalle.png")}
              className="h-14"
              style={{ width: "100%", resizeMode: "contain" }}
            />
          </TouchableOpacity>
        </View>
        {/* Menu */}
        <View className="w-4/6 h-full flex-row justify-around px-2">
          {/* Inicio */}
          <TouchableOpacity
            className="w-1/5 h-full text-center justify-center items-center"
            onPress={() => props.navigation.navigate("Home")}
          >
            <MaterialCommunityIcons
              name="home-variant-outline"
              size={24}
              color="white"
            />
            <Text className="text-white text-xs md:text-lg font-bold">
              Inicio
            </Text>
          </TouchableOpacity>
          {/* Estudiantes */}
          <TouchableOpacity
            className="w-1/5 h-full text-center justify-center items-center"
            onPress={() => props.navigation.navigate("Users")}
          >
            <MaterialCommunityIcons
              name="account-tie-outline"
              size={28}
              color="white"
            />
            <Text className="text-white text-xs md:text-lg font-bold">
              Estudiantes
            </Text>
          </TouchableOpacity>
          {/* Grupos */}
          <TouchableOpacity
            className="w-1/5 h-full text-center justify-center items-center"
            onPress={() => props.navigation.navigate("Teams")}
          >
            <MaterialCommunityIcons
              name="account-group-outline"
              size={28}
              color="white"
            />
            <Text className="text-white text-xs md:text-lg font-bold">
              Grupos
            </Text>
          </TouchableOpacity>
          {/* Tareas */}
          <TouchableOpacity
            className="w-1/5 h-full text-center justify-center items-center"
            onPress={() => props.navigation.navigate("Tasks")}
          >
            <AntDesign name="book" size={24} color="white" />
            <Text className="text-white text-xs md:text-lg font-bold">
              Tareas
            </Text>
          </TouchableOpacity>
          {/* Horas */}
          <TouchableOpacity
            className="w-1/5 h-full text-center justify-center items-center border-b-4 border-white"
            onPress={() => props.navigation.navigate("Hours")}
          >
            <AntDesign name="clockcircleo" size={24} color="white" />
            <Text className="text-white text-xs md:text-lg font-bold">
              Horas
            </Text>
          </TouchableOpacity>
        </View>
        {/* Perfil */}
        <View className="w-1/6 h-full">
          <TouchableOpacity
            className="h-full items-center justify-center"
            onPress={() => {
              props.navigation.navigate("Profile");
            }}
          >
            <View className="h-12 w-12 rounded-full">
              <FontAwesome name="user-circle-o" size={48} color="#FFF" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View className="bg-white border-[#e7e7e6] border rounded w-11/12 h-5/6 my-5 shadow p-1">
        {/*Barra superior*/}
        <View className="h-20 flex-row justify-around items-center border-b-2 border-[#e7e7e6] mb-1">
          {/*Nombre del Grupos*/}
          <Text className="text-black text-2xl font-bold">
            {teamData.teamName}
          </Text>
        </View>
        {/*Contenido*/}
        <View className="w-full h-5/6">
          {/*Contenedor de listas*/}
          <View className="w-full h-full items-center lg:flex-row">
            <View className="w-full h-full border-[#e7e7e6] border rounded">
              <ScrollView className="w-full">
                <Text className="text-black text-lg text-center font-bold">
                  Miembros
                </Text>
                {users.map((member, index) => (
                  <UserCard
                    key={index}
                    onPress={() => showHours(member)}
                    screen="HoursModal"
                    userData={member}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HoursModal;

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
});
