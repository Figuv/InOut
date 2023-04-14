import Home from "./screens/Home";
import Register from "./screens/Register";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeWindStyleSheet } from "nativewind";
import { AppProvider } from "./AppContext";
import Login from "./screens/Login";
import AddUser from "./screens/AddUser";
import Tasks from "./screens/Tasks";
import AddTask from "./screens/AddTask";
import ModalTask from "./components/TaskModal";
import AddTeam from "./screens/AddTeam";
import Teams from "./screens/Teams";
import ModalTeam from "./components/TeamModal";
import TeamCard from "./components/TeamCard";
import Users from "./screens/Users";

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
        name="Home"
        component={Home}
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
      <Stack.Group screenOptions={{ presentation: "modal" }}>
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
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </AppProvider>
  );
}
