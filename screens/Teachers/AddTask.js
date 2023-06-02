import React, { createElement, useEffect, useState } from "react";
import {
  Platform,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  getDocs,
} from "firebase/firestore";
import db from "../../database/firebase";
import tw from "tailwind-react-native-classnames";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";

const AddTask = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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

  //Add task
  const addTask = async () => {
    try {
      const taskRef = await addDoc(collection(db, "tasks"), {
        title,
        description,
        startDate,
        endDate,
        state: 1,
        teamId: selectedValue,
      });
      const taskId = taskRef.id;

      // Get users with matching teamId
      const usersQuerySnapshot = await getDocs(
        query(collection(db, "users"), where("teamId", "==", selectedValue))
      );

      const userTaskPromises = usersQuerySnapshot.docs.map(async (userDoc) => {
        const userTaskRef = await addDoc(collection(db, "user_task"), {
          state: 1,
          userId: userDoc.id,
          taskId: taskId,
        });
        console.log("Added user_task document with ID:", userTaskRef.id);
      });

      await Promise.all(userTaskPromises);

      props.navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      className="bg-[#6F47EB] h-full w-full items-center justify-center"
      behavior="padding"
    >
      <SafeAreaView>
        <View className="flex-col h-screen items-center justify-center">
          <View className="">
            <Text className="text-white font-black text-4xl">Tasks</Text>
          </View>
          <View className="mt-6 w-full max-w-md">
            <View className="mb-2">
              <Text className="text-white font-bold text-lg">Title:</Text>
              <TextInput
                value={title}
                onChangeText={(text) => setTitle(text)}
                className="bg-white rounded-2xl w-80 lg:w-96 h-12 px-4 font-bold"
              />
            </View>
            <View className="mb-2">
              <Text className="text-white font-bold text-lg">Description:</Text>
              <TextInput
                value={description}
                onChangeText={(text) => setDescription(text)}
                className="bg-white rounded-2xl w-80 lg:w-96 h-12 px-4 font-bold"
              />
            </View>

            {/* Date picker*/}
            <View>
              <TouchableOpacity
                onPress={() => setOpenD(true)}
                uppercase={false}
                mode="outlined"
              >
                <Text className="text-white font-bold text-lg">
                  Start Date: {startDate?.toDateString()}
                </Text>
              </TouchableOpacity>
              <DatePickerModal
                locale="en"
                mode="single"
                visible={openDS}
                onDismiss={onDismissSingle}
                date={startDate}
                onConfirm={onConfirmSingle}
              />
            </View>
            {/* End date */}
            <View>
              <TouchableOpacity
                onPress={() => setOpenDF(true)}
                uppercase={false}
                mode="outlined"
              >
                <Text className="text-white font-bold text-lg">
                  End Date: {endDate?.toDateString()}
                </Text>
              </TouchableOpacity>
              <DatePickerModal
                locale="en"
                mode="single"
                visible={openDF}
                onDismiss={onDismissSingleF}
                date={endDate}
                onConfirm={onConfirmSingleF}
              />
            </View>

            {/* Drop down picker */}
            <View>
              <Text className=" text-white font-bold text-lg">
                Selecciona el Equipo:
              </Text>
              <DropDownPicker
                items={teams.map((team) => ({
                  label: team.teamName,
                  value: team.id,
                }))}
                open={open}
                setOpen={setOpen}
                value={selectedValue}
                defaultValue={selectedValue}
                className="bg-white rounded-2xl w-80 lg:w-96 h-12 px-4 font-bold mb-2 border-0"
                onSelectItem={(item) => setSelectedValue(item.value)}
                placeholder="Select a team"
              />
            </View>

            <TouchableOpacity
              onPress={() => addTask()}
              className="bg-white rounded-lg px-4 py-2 w-full items-center -z-10"
            >
              <Text className="text-[#6F47EB] font-bold text-lg">
                Create Task
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default AddTask;
