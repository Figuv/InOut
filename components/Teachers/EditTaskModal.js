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
import db from "../../database/firebase";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
import DropDownPicker from "react-native-dropdown-picker";

const EditTaskModal = (props) => {
  const { taskData } = props.route.params;
  const { id } = taskData;

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

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
    <SafeAreaView className="flex-1 bg-[#6F47EB] w-full h-full justify-center items-center">
      <View className="items-center justify-between px-4 space-y-3">
        <View className="items-center py-5">
          <Text className="text-white text-3xl font-bold">
            {taskData.title}
          </Text>
        </View>
        <View className="flex-1 items-center">
          {/* Renderizar los campos editables */}

          <View className="items-center px-4">
            <Text className="text-white text-xl font-bold">
              Edit task Tittle
            </Text>
            <TextInput
              className="bg-white rounded-2xl w-80 h-12 px-4 font-bold mb-2"
              placeholder="Team Tittle"
              value={taskTitle}
              onChangeText={(text) => setTaskTitle(text)}
            />
          </View>
          <View className="items-center px-4">
            <Text className="text-white text-xl font-bold">
              Edit task Description
            </Text>
            <TextInput
              className="bg-white rounded-2xl w-80 h-12 px-4 font-bold mb-2"
              placeholder="Team Description"
              value={taskDescription}
              onChangeText={(text) => setTaskDescription(text)}
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
          <View className="mx-4 items-center">
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
              dropDownContainerStyle={{
                marginLeft: -3,
                borderWidth: 3,
                borderTopWidth: 0,
                borderLeftColor: "#6F47EB",
                borderRightColor: "#6F47EB",
                borderBotttomWidth: 4,
                borderBottomColor: "#6F47EB",
                backgroundColor: "#fff",
              }}

            />
          </View>
        </View>

        <View className="flex-row items-center justify-between px-4 space-x-1">
          <TouchableOpacity
            onPress={() => {
              editTask();
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

export default EditTaskModal;
