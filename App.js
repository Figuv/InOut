import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeWindStyleSheet } from "nativewind";
import { AppProvider } from "./AppContext";
import { StatusBar } from "expo-status-bar";

import Login from "./screens/Login";
import Register from "./screens/Register";
import Profile from "./screens/Profile";

import Home from "./screens/Home";
import HomeUsers from "./screens/HomeUsers";
import HomeAdmins from "./screens/HomeAdmins";

import Tasks from "./screens/Tasks";
import TasksUsers from "./screens/TasksUsers";
import AddTask from "./screens/AddTask";
import ModalTask from "./components/TaskModal";
import ModalTaskUser from "./components/TaskModalUser";
import EditTaskModal from "./components/EditTaskModal";

import Teams from "./screens/Teams";
import AddTeam from "./screens/AddTeam";
import ModalTeam from "./components/TeamModal";
import TeamCard from "./components/TeamCard";
import Hours from "./screens/Hours";
import EditTeamModal from "./components/EditTeamModal";

import Users from "./screens/Users";
import UserModal from "./components/UserModal";
import AddUser from "./screens/AddUser";
import EditUserModal from "./components/EditUserModal";

import Coordinators from "./screens/Coordinators";
import AddCoordinator from "./screens/AddCoordinator";
import CoordinatorModal from "./components/CoordinatorModal";
import EditCoordinatorModal from "./components/EditCoordinatorModal";
import CoordinatorTaskModal from "./components/CoordinatorTaskModal";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Register"
        component={Register}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={Profile}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="HomeAdmins"
        component={HomeAdmins}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="HomeUsers"
        component={HomeUsers}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AddUser"
        component={AddUser}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Tasks"
        component={Tasks}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="TasksUsers"
        component={TasksUsers}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AddTask"
        component={AddTask}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AddTeam"
        component={AddTeam}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Teams"
        component={Teams}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Team"
        component={TeamCard}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Users"
        component={Users}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Coordinators"
        component={Coordinators}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AddCoordinator"
        component={AddCoordinator}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Hours"
        component={Hours}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          options={{ headerShown: false }}
          name="ModalCoordinator"
          component={CoordinatorModal}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="EditCoordinatorModal"
          component={EditCoordinatorModal}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ModalTeam"
          component={ModalTeam}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ModalTask"
          component={ModalTask}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ModalTaskUser"
          component={ModalTaskUser}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ModalUser"
          component={UserModal}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ModalEditUser"
          component={EditUserModal}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ModalEditTeam"
          component={EditTeamModal}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ModalTaskUsers"
          component={CoordinatorTaskModal}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ModalEditTask"
          component={EditTaskModal}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </AppProvider>
  );
}