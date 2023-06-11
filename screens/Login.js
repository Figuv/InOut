import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import React, { useState, useContext } from "react";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import db from "../database/firebase";
import { SHA256 } from "crypto-js";
import { AppContext } from "../AppContext";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";

const Login = (props) => {
  const { storeGlobalData } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const login = async () => {
    if (email.length === 0 && password.length === 0) {
      alert("No pueden existir campos vacios");
    } else {
      const adminsQuery = query(
        collection(db, "admins"),
        where("email", "==", email)
      );
      const coordinatorsQuery = query(
        collection(db, "coordinators"),
        where("email", "==", email)
      );
      const usersQuery = query(
        collection(db, "users"),
        where("email", "==", email)
      );
      const adminsQuerySnapshot = await getDocs(adminsQuery);
      const coordinatorsQuerySnapshot = await getDocs(coordinatorsQuery);
      const usersQuerySnapshot = await getDocs(usersQuery);

      if (
        adminsQuerySnapshot.empty &&
        coordinatorsQuerySnapshot.empty &&
        usersQuerySnapshot.empty
      ) {
        alert("Correo electronico no encontrado");
        return;
      }

      let userData;
      if (!adminsQuerySnapshot.empty) {
        const user = adminsQuerySnapshot.docs[0];
        if (hashPassword(password) !== user.data().password) {
          alert("Contraseña incorrecta");
          return;
        }
        userData = user.data();
        userData.id = user.id;
        userData.role = "Administrador";
      } else if (!coordinatorsQuerySnapshot.empty) {
        const user = coordinatorsQuerySnapshot.docs[0];
        if (hashPassword(password) !== user.data().password) {
          alert("Contraseña incorrecta");
          return;
        }
        userData = user.data();
        userData.id = user.id;
        userData.role = "Coordinador";
      } else if (!usersQuerySnapshot.empty) {
        const user = usersQuerySnapshot.docs[0];
        if (hashPassword(password) !== user.data().password) {
          alert("Contraseña incorrecta");
          return;
        }
        userData = user.data();
        userData.id = user.id;
        userData.role = "Estudiante";
        checkSession(userData);
      }
      storeGlobalData({ user: userData });

      if (userData.role === "Administrador") {
        props.navigation.navigate("HomeAdmins");
        return;
      } else if (userData.role === "Coordinador") {
        props.navigation.navigate("Home");
        return;
      } else if (userData.role === "Estudiante") {
        props.navigation.navigate("HomeUsers");
        return;
      }
    }
  };

  // Check if session exists
  // const checkSession = async (user) => {
  //   const q = query(
  //     collection(db, "session"),
  //     where("userId", "==", user.id),
  //     where("logDate", "==", new Date().toDateString())
  //   );
  //   const querySnapshot = await getDocs(q);
  //   if (querySnapshot.empty) {
  //     const session = {
  //       userId: user.id,
  //       logDate: new Date().toDateString(),
  //       loginTime: new Date().toLocaleTimeString(),
  //       logoutTime: "",
  //       hours: "",
  //     };
  //     const docRef = await addDoc(collection(db, "session"), session);
  //   } else {
  //     console.log("Session already exists");
  //   }
  // };
  const checkSession = async (user) => {
    const q = query(
      collection(db, "session"),
      where("userId", "==", user.id),
      where("logDate", "==", new Date().toDateString())
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      // Obtener la ubicación actual
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permiso de ubicación denegado");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const session = {
        userId: user.id,
        logDate: new Date().toDateString(),
        loginTime: new Date().toLocaleTimeString(),
        logoutTime: "",
        hours: "",
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }, // Agregar las coordenadas de la ubicación actual al campo "location"
      };

      const docRef = await addDoc(collection(db, "session"), session);
    } else {
      console.log("Session already exists");
    }
  };

  const hashPassword = (password) => {
    const hash = SHA256(password).toString();
    return hash;
  };

  return (
    <KeyboardAvoidingView
      className="h-full w-full items-center justify-center"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground
        source={require("../assets/bgLoginP2.png")}
        className="h-full items-center justify-center"
        style={{ width: "100%", resizeMode: "stretch" }}
      >
        <SafeAreaView>
          <View className="flex-col items-center justify-center">
            {/* Header */}
            <View className="my-4">
              <Image
                source={require("../assets/logoUnivalle2.png")}
                className="h-20 w-96"
                style={{ resizeMode: "contain" }}
              />
            </View>
            {/* Inputs */}
            <View className="bg-white space-y-4 items-center rounded shadow py-8">
              <TextInput
                className="bg-white rounded w-80 h-12 p-4 font-bold border border-[#e7e7e6] mx-8 text-center shadow-sm"
                placeholder="Correo Electronico"
                onChangeText={(text) => setEmail(text)}
                autoCapitalize="none"
              ></TextInput>
              <View className="bg-white rounded w-80 flex-row border border-[#e7e7e6] items-center">
                <TextInput
                  className="bg-white w-4/5 h-12 font-bold text-center shadow-sm"
                  placeholder="Contraseña"
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={!showPassword}
                ></TextInput>
                <TouchableOpacity
                  className="w-1/5 h-12 justify-center items-center border-l border-[#e7e7e6] "
                  onPress={togglePasswordVisibility}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={24}
                    color="#6F47EB"
                  />
                </TouchableOpacity>
              </View>
              {/* Login Button */}
              <View>
                <TouchableOpacity
                  className="bg-[#7751EC] rounded w-80 h-14 justify-center items-center mt-9 shadow"
                  onPress={login}
                >
                  <Text className="text-white font-bold text-2xl">
                    INICIAR SESION
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};
export default Login;
