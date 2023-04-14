import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { collection, addDoc} from "firebase/firestore";
import db from "../database/firebase";
import bycript from "bcryptjs";

const AddUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const hashPassword = (password) => {
    return bycript.hashSync(password, 10);
  };

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
        });
        props.navigation.navigate("Home");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View className="h-full w-full">
      <SafeAreaView>
        <View className="space-y-4 mb-60 items-center">
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
          {/* Login Button */}
          <View>
            <TouchableOpacity className="bg-[#fff] rounded-2xl w-80 h-12 justify-center items-center"
              onPress={handleCreateAccount}
              >
              <Text className="text-[#6F47EB] font-bold text-2xl">Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AddUser;
