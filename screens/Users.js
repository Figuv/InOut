import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import db from "../database/firebase";
import UserCard from "../components/UserCard";

const Users = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const usersData = [];
      querySnapshot.forEach((doc) => {
        usersData.push(doc.data());
      });
      setUsers(usersData);
    });
    return unsubscribe;
  }, []);

 

  return (
    <View className="flex-1">
  <SafeAreaView>
    <View className="items-center justify-center">
      <View>
        <Text className="text-4xl font-bold mb-5">Users</Text>
      </View>
      <ScrollView>
        {users.map((user, index) => (
          <UserCard key={index} name={user.name} email={user.email} />
        ))}
      </ScrollView>
    </View>
  </SafeAreaView>
</View>

  );
};

export default Users
