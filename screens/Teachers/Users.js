import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import db from "../../database/firebase";
import UserCard from "../../components/UserCard";
import { FontAwesome } from "@expo/vector-icons";

const Users = (props) => {
  const [users, setUsers] = useState([]);

  // Get users
  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const usersData = [];
      querySnapshot.forEach((doc) => {
        // usersData.push(doc.data());
        const user = doc.data();
        user.id = doc.id; // agregar la propiedad "id" al objeto team
        usersData.push(user);
      });
      setUsers(usersData);
    });
    return unsubscribe;
  }, []);
  const showModal = (userData) => {
    props.navigation.navigate("ModalUser", { userData });
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
              <UserCard
                key={index}
                userData={user}
                screen="Users"
                onPress={() => showModal(user)}
              />
            ))}
          </ScrollView>
          <View className="flex-row">
            <TouchableOpacity
              onPress={() => props.navigation.navigate("AddUser")}
              className="bg-white py-2 px-4 rounded-lg"
            >
              <FontAwesome
                name="user-plus"
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

export default Users;
