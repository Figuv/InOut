import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, Image, } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, deleteDoc, doc, updateDoc, } from "firebase/firestore";
import db from "../database/firebase";
import DropDownPicker from "react-native-dropdown-picker";
import UserCard from "./UserCard";
import Constants from 'expo-constants';
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import TaskCard from "../components/TaskCard";

const TeamModal = (props) => {
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
    const t = query(collection(db, "tasks"), where("teamId", "==", id.trim()), where("state", "==", 1));
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

  //Delete team
  const deleteTeam = () => {
    const teamRef = collection(db, "teams");
    deleteDoc(doc(teamRef, teamData.id))
      .then(() => {
        console.log("Team deleted successfully");
        props.navigation.goBack();
      })
      .catch((error) => {
        console.error("Error deleting team: ", error);
      });
  };
  //Edit team
  const editTeam = () => {
    props.navigation.navigate("ModalEditTeam", { teamData });
  };

  //Show user modal
  const showUserModal = (userData) => {
    props.navigation.navigate("ModalUser", { userData });
  };

  //Show task modal
  const showTaskModal = (taskData) => {
    taskData.teamId = id;
    props.navigation.navigate("ModalTaskUsers", { taskData });
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
    <View className="bg-[#f8f9fa] h-full w-full items-center">
      {/* Navbar */}
      <View className="bg-[#6F47EB] w-full h-24 items-center justify-around flex-row px-2 shadow" style={styles.container}>
        {/* Logo */}
        <View className="w-1/6 h-full">
          <TouchableOpacity
            className=" flex-1 items-center justify-center"
            onPress={() => {props.navigation.navigate("Home")}}
          >
            <Image source={require('../assets/logoUnivalle.png')} className="h-14" style={{width: '100%', resizeMode:"contain"}}/>
          </TouchableOpacity>
        </View>
        {/* Menu */}
        <View className="w-4/6 h-full flex-row justify-around px-2">
          {/* Inicio */}
          <TouchableOpacity className="w-1/5 h-full text-center justify-center items-center"
            onPress={() => props.navigation.navigate("Home")}
          >
            <MaterialCommunityIcons name="home-variant-outline" size={24} color="white" />
            <Text className="text-white text-xs md:text-lg font-bold">Inicio</Text>
          </TouchableOpacity>
          {/* Estudiantes */}
          <TouchableOpacity className="w-1/5 h-full text-center justify-center items-center"
            onPress={() => props.navigation.navigate("Users")}
          >
            <MaterialCommunityIcons name="account-tie-outline" size={28} color="white" />
            <Text className="text-white text-xs md:text-lg font-bold">Estudiantes</Text>
          </TouchableOpacity>
          {/* Grupos */}
          <TouchableOpacity className="w-1/5 h-full text-center justify-center items-center border-b-4 border-white "
            onPress={() => props.navigation.navigate("Teams")}
          >
            <MaterialCommunityIcons name="account-group-outline" size={28} color="white" />
            <Text className="text-white text-xs md:text-lg font-bold">Grupos</Text>
          </TouchableOpacity>
          {/* Tareas */}
          <TouchableOpacity className="w-1/5 h-full text-center justify-center items-center"
            onPress={() => props.navigation.navigate("Tasks")}
          >
            <AntDesign name="book" size={24} color="white"/>
            <Text className="text-white text-xs md:text-lg font-bold">Tareas</Text>
          </TouchableOpacity>
          {/* Horas */}
          <TouchableOpacity className="w-1/5 h-full text-center justify-center items-center"
            onPress={() => props.navigation.navigate("Hours")}
          >
            <AntDesign name="clockcircleo" size={24} color="white"/>
            <Text className="text-white text-xs md:text-lg font-bold">Horas</Text>
          </TouchableOpacity>
        </View>
        {/* Perfil */}
        <View className="w-1/6 h-full">
          <TouchableOpacity className="h-full items-center justify-center"
            onPress={() => {props.navigation.navigate("Profile")}}
          >
            <Image source={{uri: "https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg"}} className="h-12 w-12 rounded-full"/>
          </TouchableOpacity>
        </View>
      </View>
      <View className="bg-white border-[#e7e7e6] border rounded w-11/12 h-5/6 my-5 shadow p-1">
        {/*Barra superior*/}
        <View className="h-20 flex-row justify-around items-center border-b-2 border-[#e7e7e6] mb-1">
          {/*Nombre del Grupos*/}
          <Text className="text-black text-2xl font-bold">{teamData.teamName}</Text>
        </View>
        {/*Contenido*/}
        <View className="w-full h-5/6">
          {/*Contenedor de listas*/}
          <View className="w-full h-4/6 items-center lg:flex-row">
            <View className="w-full lg:w-1/2 h-1/2 lg:h-5/6 border-[#e7e7e6] border rounded">
              <ScrollView className="w-full">
                <Text className="text-black text-lg text-center font-bold">Miembros</Text>
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
            </View>
            <View className="w-full lg:w-1/2 h-1/2 lg:h-5/6 border-[#e7e7e6] border rounded">
              <ScrollView>
                <Text className="text-black text-lg text-center font-bold">Tareas</Text>
                {tasks.map((task, index) => (
                  <TaskCard 
                    key={index} 
                    task={task} 
                    onPress={() => showTaskModal(task)}
                  />
                ))
              }
              </ScrollView>
            </View>
        </View>
        <View className="w-full h-2/6 justify-around items-center">
          <View className="w-full h-1/2 justify-center items-center px-2">
              <Text className=" text-black font-bold text-lg">Agregar miembros</Text>
              <DropDownPicker
                items={addUsers.map((user) => ({
                  label: user.name,
                  value: user.id,
                }))}
                open={open}
                setOpen={setOpen}
                value={selectedValue}
                defaultValue={selectedValue}
                className="bg-white rounded-2xl w-full lg:w-full h-12 px-4 font-bold mb-2 items-center justify-center"
                onSelectItem={(item) => setSelectedValue(item.value)}
                placeholder="Seleccione un estudiante"
                listItemContainerStyle={{
                  backgroundColor: "#fff",
                  borderRadius: 2,
                  borderWidth: 0,
                  borderColor: "#e7e7e6",
                }}
                dropDownContainerStyle={{
                  backgroundColor: "transparent",
                  borderWidth: 1,
                  width: "100%",
                }}
              />
            </View>
            <View className="w-full flex-row items-center justify-around px-4 space-x-2">
              <TouchableOpacity
                onPress={() => addToTeam()}
                className="bg-[#6F47EB] w-1/3 rounded-2xl h-12 justify-center items-center shadow-lg"
              >
                <Text className="text-white text-sm lg:text-lg font-bold text-center">Aceptar Usuario</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  editTeam();
                }}
                className="bg-white w-1/3 rounded-2xl h-12 justify-center items-center shadow-lg border-[#6F47EB] border-2"
              >
                <Text className="text-[#6F47EB] text-sm lg:text-lg font-bold text-center">Editar Equipo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteTeam()}
                className="bg-[#EC2008] w-1/3 rounded-2xl h-12 justify-center items-center shadow-lg"
              >
                <Text className="text-white text-sm lg:text-lg font-bold text-center">Eliminar Equipo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TeamModal;

const styles = StyleSheet.create({
  container: {
      paddingTop: Constants.statusBarHeight,
  }
});