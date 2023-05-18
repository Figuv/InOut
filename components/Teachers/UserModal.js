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

const UserModal = (props) => {
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
    props.navigation.navigate("ModalEditUser", { userData });
  };

  //Delete user
  const deleteUser = async () => {
    const userRef = collection(db, "users");
    deleteDoc(doc(userRef, id))
      .then(() => {
        console.log("User deleted successfully");
        props.navigation.goBack();
      })
      .catch((error) => {
        console.error("Error deleting user: ", error);
      });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#6F47EB] w-full h-full justify-center items-center">
      <View className="items-center justify-between px-4 space-y-4">
        <View className="items-center p-5">
          <Text className="text-white text-3xl font-bold">{userData.name}</Text>
          <Text className="text-white text-lg">{userData.email}</Text>
          <Text className="text-white text-lg">{hours}</Text>
        </View>
        <ScrollView className="flex-1">
          {sessions.map((session, index) => (
            <View
              key={index}
              className="bg-[#fff] rounded-2xl w-80 h-12 justify-center items-center shadow-lg my-2"
            >
              <View>
                <Text className="font-bold text-lg">{session.hours}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View className="flex-row items-center justify-between px-4 space-x-1">
          <TouchableOpacity className="bg-gray-500 flex-grow rounded-2xl w-auto h-12 justify-center items-center shadow-lg">
            <Text
              className="text-white text-lg font-bold"
              onPress={() => editUser()}
            >
              Edit User
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#EC2008] flex-grow rounded-2xl w-auto h-12 justify-center items-center shadow-lg"
            onPress={() => deleteUser()}
          >
            <Text className="text-white text-lg font-bold">Delete User</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserModal;
