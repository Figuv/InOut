import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import TeamCard from "../../components/Teachers/TeamCard";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import db from "../../database/firebase";
import { AppContext } from "../../AppContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Users from "./Users";
import { FontAwesome } from "@expo/vector-icons";
import AddUser from "./AddUser";

const Tab = createBottomTabNavigator();

const Teams = (props) => {
  const { globalData } = useContext(AppContext);
  const { user } = globalData;
  const { id } = user;

  const [teams, setTeams] = useState([]);

  // Get teams
  useEffect(() => {
    // const q = query(collection(db, "teams"));
    const q = query(collection(db, "teams"), where("adminId", "==", id.trim()));
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
    props.navigation.navigate("ModalTeam", { teamData });
  };

  return (
    <View className="bg-[#6F47EB] h-full w-full items-center justify-center">
      <SafeAreaView>
        <View className="flex-col items-center justify-center relative">
          <View className="mb-10">
            <Text className="text-white font-black text-4xl">Teams</Text>
          </View>

          <ScrollView
            className="flex-1 w-max h-full"
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
          <View className="flex-row w-screen bg-white rounded-full p-1 justify-evenly">
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Users")}
              className="bg-white p-2 rounded-full shadow-lg items-center"
            >
              <FontAwesome
                name="users"
                size={24}
                color="black"
                className="text-black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("AddTeam")}
              className="bg-white p-2 rounded-full shadow-lg items-center"
            >
              <FontAwesome
                name="plus"
                size={24}
                color="black"
                className="text-black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("AddTask")}
              className="bg-white p-2 rounded-full shadow-lg items-center"
            >
              <FontAwesome
                name="tasks"
                size={24}
                color="black"
                className="text-black"
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Teams;
