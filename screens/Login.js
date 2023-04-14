import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Platform,
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
import bycript from "bcryptjs";
import { AppContext } from "../AppContext";

const Login = (props) => {
  const { storeGlobalData } = useContext(AppContext);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAccount = async () => {
    if (email.length === 0 && password.length === 0) {
      alert("Please enter an email and password");
    } else {
      const q = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (bycript.compareSync(password, doc.data().password)) {
          storeGlobalData({ user:doc.data() });
          props.navigation.navigate("Home");
        } else {
          alert("Incorrect password");
        }
      });
    }
  };
  

  return (
    <KeyboardAvoidingView
      className="bg-[#6F47EB] h-full w-full items-center justify-center"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView>
        <View className="flex-col items-center justify-center">
          {/* Header */}
          <View className="my-4">
            <Text className="text-white font-black text-4xl">Login</Text>
          </View>
          {/* Inputs */}
          <View className="space-y-4 items-center">
            <TextInput
              className="bg-white rounded-2xl w-80 lg:w-96 h-12 px-4 font-bold"
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
            ></TextInput>
            <TextInput
              className="bg-white rounded-2xl w-80 h-12 px-4 font-bold"
              placeholder="Password"
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            ></TextInput>
            {/* Login Button */}
            <View>
              <TouchableOpacity
                className="bg-[#fff] rounded-2xl w-80 h-12 justify-center items-center"
                onPress={handleCreateAccount}
              >
                <Text className="text-[#6F47EB] font-bold text-2xl">Login</Text>
              </TouchableOpacity>
            </View>
            {/* Change to register page */}
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Register")}
              >
                <Text className="text-white font-bold text-lg">
                  Don't have an account?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
export default Login;
