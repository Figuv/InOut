import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import TeamCard from "../components/TeamCard";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import db from "../database/firebase";

const Teams = (props) => {

  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "teams"));
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
        <View className="flex-col items-center justify-center">
          <View className="">
            <Text className="text-white font-black text-4xl">Teams</Text>
          </View>
          <ScrollView className="flex-1 w-full h-full"
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
      </SafeAreaView>
    </View>
  );
};

export default Teams;
