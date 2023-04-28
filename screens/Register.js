import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import db from "../database/firebase";
import { SHA256 } from "crypto-js";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Hash password
  const hashPassword = (password) => {
    const hash = SHA256(password).toString();
    return hash;
  };

  // Create account function
  const handleCreateAccount = async () => {
    console.log("Creating account...");
    if (email.length === 0) {
      alert("Please enter an email");
    } else {
      try {
        await addDoc(collection(db, "users"), {
          name: name,
          email: email,
          password: hashPassword(password),
          teamId: ""
        });
        props.navigation.navigate("Login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      className="bg-[#6F47EB] h-full w-full items-center justify-center"
      behavior="padding"
    >
      <SafeAreaView>
        <View className="flex-col h-screen items-center justify-center">
          {/* Header */}
          <View className="my-4">
            <Text className="text-white font-black text-4xl">Register</Text>
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
            <TextInput
              className="bg-white rounded-2xl w-80 h-12 px-4 font-bold"
              placeholder="Name"
              onChangeText={(text) => setName(text)}
            ></TextInput>

            {/* Register Button */}
            <View>
              <TouchableOpacity
                className="bg-[#fff] rounded-2xl w-80 h-12 justify-center items-center"
                onPress={handleCreateAccount}
              >
                <Text className="text-[#6F47EB] font-bold text-2xl">
                  Register
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Login")}
              >
                <Text className="text-white font-bold text-lg">
                  Already have an account?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Register;
