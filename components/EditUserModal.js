import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
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

const EditUserModal = (props) => {
  const { userData } = props.route.params;
  const { id } = userData;
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  //do the logic to the function editTeam
  const editUser = async () => {
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, {
      name: userName,
      email: userEmail,
    });
    props.navigation.navigate("Users");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#6F47EB] w-full h-full justify-center items-center">
      <View className="items-center justify-between px-4 space-y-3">
        <View className="items-center py-5">
          <Text className="text-white text-3xl font-bold">
            Edit User {userData.name}
          </Text>
        </View>
        <View className="flex-1 items-center">
          {/* Renderizar los campos editables */}
          <View className="items-center px-4">
            <Text className="text-white text-lg font-bold">Edit User Name</Text>
            <TextInput
              className="bg-white rounded-2xl w-80 h-12 px-4 font-bold mb-2"
              placeholder="User Name"
              value={userName}
              onChangeText={(text) => setUserName(text)}
            />
          </View>
          <View className="items-center px-4">
            <Text className="text-white text-lg font-bold">Edit User Email</Text>
            <TextInput
              className="bg-white rounded-2xl w-80 h-12 px-4 font-bold mb-2"
              placeholder="User Email"
              value={userEmail}
              onChangeText={(text) => setUserEmail(text)}
            />
          </View>
        </View>

        <View className="flex-row items-center justify-between px-4 space-x-1">
          <TouchableOpacity
            onPress={() => {
              editUser();
            }}
            className="bg-gray-500 flex-grow rounded-2xl w-auto h-12 justify-center items-center shadow-lg"
          >
            <Text className="text-white text-lg font-bold">Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}
            className="bg-[#EC2008] flex-grow rounded-2xl w-auto h-12 justify-center items-center shadow-lg"
          >
            <Text className="text-white text-lg font-bold">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditUserModal;
