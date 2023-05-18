import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
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
import db from "../../database/firebase";
import DropDownPicker from "react-native-dropdown-picker";
import UserCard from "../UserCard";
const TeamModalUsers = () => {
  const { teamData } = props.route.params;
  const [users, setUsers] = useState([]);
  const { id } = teamData;
  const [addUsers, setAddUsers] = useState([]);

  //Dorp down picker open and value
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  //Get users withou team
  useEffect(() => {
    const q = query(collection(db, "users"), where("teamId", "==", ""));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        const user = doc.data();
        user.id = doc.id;
        users.push(user);
      });
      setAddUsers(users);
    });
    return unsubscribe;
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

  //Add user to team
  const addToTeam = () => {
    const userRef = doc(db, "users", selectedValue);
    updateDoc(userRef, {
      teamId: id.trim(),
    })
      .then(() => {
        console.log("User added to team successfully");
      })
      .catch((error) => {
        console.error("Error adding user to team: ", error);
      });
  };
  
  //Show user modal
  const showUserModal = (userData) => {
    props.navigation.navigate("ModalUser", { userData });
  };

  //Remove user from team
  const removeFromTeam = (userData) => {
    const userRef = doc(db, "users", userData.id);
    updateDoc(userRef, {
      teamId: "",
    })
      .then(() => {
        console.log("User removed from team successfully");
      })
      .catch((error) => {
        console.error("Error removing user from team: ", error);
      });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#6F47EB] w-full h-full justify-center items-center">
      <View className="items-center justify-between px-4 space-x-4">
        <View className=" p-5">
          <Text className="text-white text-3xl font-bold">
            {teamData.teamName}
          </Text>
          <Text className="text-white text-lg">{teamData.description}</Text>
        </View>
        <ScrollView className="flex-1">
          {users.map((member, index) => (
            <UserCard
              key={index}
              onPress={() => showUserModal(member)}
              screen="TeamModal"
              userData={member}
              removeUser={() => removeFromTeam(member)}
            />
          ))}
        </ScrollView>
        <View className="mx-4">
          <Text className=" text-white font-bold text-lg">
            Add members to the team
          </Text>
          <DropDownPicker
            items={addUsers.map((user) => ({
              label: user.name,
              value: user.id,
            }))}
            open={open}
            setOpen={setOpen}
            value={selectedValue}
            defaultValue={selectedValue}
            className="bg-white rounded-2xl w-80 lg:w-96 h-12 px-4 font-bold mb-2 border-0"
            onSelectItem={(item) => setSelectedValue(item.value)}
            placeholder="Select a team"
            listItemContainerStyle={{
              backgroundColor: "#fff",
              borderRadius: 2,
              borderWidth: 0,
              borderColor: "#6F47EB",
            }}
            dropDownContainerStyle={{
              backgroundColor: "transparent",
              borderWidth: 0,
              alignSelf: "center",
              width: "98%",
            }}
          />
        </View>
        <View className="flex-row items-center justify-between px-4 space-x-1">
          <TouchableOpacity
            onPress={() => addToTeam()}
            className="bg-white flex-grow rounded-2xl w-auto h-12 justify-center items-center shadow-lg"
          >
            <Text className="text-[#6F47EB] text-lg font-bold">
              Add Members
            </Text>
          </TouchableOpacity>          
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TeamModalUsers;
