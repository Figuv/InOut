import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Image, } from "react-native";
import { collection, query, where, onSnapshot, deleteDoc, doc, updateDoc, } from "firebase/firestore";
import db from "../database/firebase";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
import DropDownPicker from "react-native-dropdown-picker";
import Constants from 'expo-constants';
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

const EditTaskModal = (props) => {
  const { taskData } = props.route.params;
  const { id } = taskData;

  const [taskTitle, setTaskTitle] = useState(taskData.title);
  const [taskDescription, setTaskDescription] = useState(taskData.description);

  const [teams, setTeams] = useState([]);

  //Dorp down picker open and value
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  //Date picker Start
  const [startDate, setStartDate] = useState(undefined);
  const [openDS, setOpenD] = React.useState(false);
  const onDismissSingle = React.useCallback(() => {
    setOpenD(false);
  }, [setOpenD]);
  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpenD(false);
      setStartDate(params.date);
    },
    [setOpenD, setStartDate]
  );

  //Date picker End
  const [endDate, setEndDate] = useState(undefined);
  const [openDF, setOpenDF] = React.useState(false);
  const onDismissSingleF = React.useCallback(() => {
    setOpenDF(false);
  }, [setOpenDF]);
  const onConfirmSingleF = React.useCallback(
    (params) => {
      setOpenDF(false);
      setEndDate(params.date);
    },
    [setOpenDF, setEndDate]
  );

  //Get teams
  useEffect(() => {
    const teamsRef = collection(db, "teams");
    const teamsQuery = query(teamsRef);
    const unsubscribe = onSnapshot(teamsQuery, (snapshot) => {
      const teamsData = [];
      snapshot.forEach((doc) => {
        const team = doc.data();
        team.id = doc.id;
        teamsData.push(team);
      });
      setTeams(teamsData);
    });

    return () => unsubscribe();
  }, []);

  //Edit task
  const editTask = async () => {
    const taskRef = doc(db, "tasks", id);
    await updateDoc(taskRef, {
      title: taskTitle,
      description: taskDescription,
      startDate: startDate,
      endDate: endDate,
      teamId: selectedValue,
    });
    props.navigation.navigate("Tasks");
  };

  return (
    <View className="bg-[#fff] h-full w-full items-center">
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
        <TouchableOpacity className="w-1/5 h-full text-center justify-center items-center"
          onPress={() => props.navigation.navigate("Teams")}
        >
          <MaterialCommunityIcons name="account-group-outline" size={28} color="white" />
          <Text className="text-white text-xs md:text-lg font-bold">Grupos</Text>
        </TouchableOpacity>
        {/* Tareas */}
        <TouchableOpacity className="w-1/5 h-full text-center justify-center items-center border-b-4 border-white"
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
    {/*Contenido de Tareas*/}
      <View className="border-[#e7e7e6] border rounded w-11/12 h-5/6 my-5 shadow p-1">
        <View className="flex-col h-screen">
          {/* Header */}
        <View className="w-full flex-row my-4 items-center">
          {/* Boton retroceder */}
          <TouchableOpacity className="w-1/5 rounded-lg p-1 justify-center items-center lg:items-start lg:ml-4"
            onPress={() => {props.navigation.goBack();}}
          >
            <AntDesign name="arrowleft" size={24} color="#6F47EB" />
          </TouchableOpacity>
          <Text className="w-3/5 text-black font-black text-2xl text-center">Nueva Tarea</Text>
        </View>
          <View className="space-y-4 items-center">
            <View className="mb-2">
              <Text className="text-black font-bold text-lg text-center">Titulo de la tarea:</Text>
              <TextInput
                value={taskTitle}
                onChangeText={(text) => setTaskTitle(text)}
                className="bg-white rounded-2xl w-80 lg:w-96 h-12 px-4 font-bold border border-[#e7e7e6]"
              />
            </View>
            <View className="mb-2">
              <Text className="text-black font-bold text-lg text-center">Descripcion:</Text>
              <TextInput
                value={taskDescription}
                onChangeText={(text) => setTaskDescription(text)}
                className="bg-white rounded-2xl w-80 lg:w-96 h-12 px-4 font-bold border border-[#e7e7e6]"
              />
            </View>

            {/* Date picker*/}
            <View className="w-80 lg:w-96 h-12 rounded-2xl border border-[#e7e7e6]">
              <TouchableOpacity
                onPress={() => setOpenD(true)}
                uppercase={false}
                mode="outlined"
                className="w-full h-full justify-center"
              >
                <Text className="text-black font-bold text-lg text-center">
                  Fecha Inicio: {startDate?.toDateString()}
                </Text>
              </TouchableOpacity>
              <DatePickerModal
                locale="es"
                mode="single"
                visible={openDS}
                onDismiss={onDismissSingle}
                date={startDate}
                onConfirm={onConfirmSingle}
              />
            </View>
            {/* End date */}
            <View className="w-80 lg:w-96 h-12 rounded-2xl border border-[#e7e7e6]">
              <TouchableOpacity
                onPress={() => setOpenDF(true)}
                uppercase={false}
                mode="outlined"
                className="w-full h-full justify-center"
              >
                <Text className="text-black font-bold text-lg text-center">
                  Fecha Finalizacion: {endDate?.toDateString()}
                </Text>
              </TouchableOpacity>
              <DatePickerModal
                locale="es"
                mode="single"
                visible={openDF}
                onDismiss={onDismissSingleF}
                date={endDate}
                onConfirm={onConfirmSingleF}
              />
            </View>

            {/* Drop down picker */}
            <View className="w-full justify-center items-center px-8">
              <Text className=" text-black font-bold text-lg">
                Selecciona el Equipo:
              </Text>
              <DropDownPicker
                items={teams.map((team) => ({
                  label:team.teamName,
                  value:team.id,
                }))}
                open={open}
                setOpen={setOpen}
                value={selectedValue}
                defaultValue={selectedValue}
                className="bg-white rounded-2xl w-full lg:w-full h-12 px-4 font-bold mb-2 items-center justify-center"
                onSelectItem={(item) => setSelectedValue(item.value)}
                placeholder="Selecciona un equipo"
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
            <View className="w-80 lg:w-96 flex-row items-center justify-around mt-5 space-x-3 -z-10">
							<TouchableOpacity
								onPress={() => {
									editTask();
								}}
								className="bg-[#6F47EB] rounded-2xl w-36 h-12 justify-center items-center shadow-lg"
							>
								<Text className="text-white text-lg font-bold">Guardar</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									props.navigation.goBack();
								}}
								className="bg-[#EC2008] rounded-2xl w-36 h-12 justify-center items-center shadow-lg"
							>
								<Text className="text-white text-lg font-bold">Cancelar</Text>
							</TouchableOpacity>
						</View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EditTaskModal;

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
    }
  });