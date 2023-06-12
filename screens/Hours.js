import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import db from "../database/firebase";
import React, { useContext, useEffect, useState } from "react";
import Constants from "expo-constants";
import { AppContext } from "../AppContext";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import TeamCard from "../components/TeamCard";
import { FontAwesome } from "@expo/vector-icons";

const Hours = (props) => {
  const { globalData } = useContext(AppContext);
  const { user } = globalData;
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "teams"),
      where("coordinatorId", "==", user.id.trim())
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const teamsData = [];
      querySnapshot.forEach((doc) => {
        // teamsData.push(doc.data());
        const team = doc.data();
        team.id = doc.id; // agregar la propiedad "id" al objeto team
        teamsData.push(team);
      });
      setTeams(teamsData);
    });
    return unsubscribe;
  }, []);

  const showModal = (teamData) => {
    props.navigation.navigate("ModalHours", { teamData });
  };

  return (
    <View className="bg-[#fff] h-full w-full items-center">
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
      {/* Contenido */}
      <View className="bg-white border-[#e7e7e6] border rounded w-11/12 h-5/6 my-5 shadow p-1">
        {/*Lista de grupos*/}
        <ScrollView
          className="flex-1 w-full h-full"
          showsVerticalScrollIndicator={false}
        >
          {teams.map((team, index) => {
            return (
              <TeamCard
                key={index}
                teamName={team.teamName}
                onPress={() => showModal(team)}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default Hours;

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
});
