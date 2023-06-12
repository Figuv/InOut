<SafeAreaView>
  {/* make a button in the center of the screen */}
  <View className="flex-col h-screen items-center justify-center space-y-2">
    <TouchableOpacity
      className="bg-[#fff] rounded-2xl w-80 h-12 justify-center items-center shadow-lg"
      onPress={() => props.navigation.navigate("Tasks", { user: user })}
    >
      <Text className="text-[#6F47EB] font-bold text-2xl">Tasks</Text>
    </TouchableOpacity>
    <TouchableOpacity
      className="bg-[#fff] rounded-2xl w-80 h-12 justify-center items-center shadow-lg"
      onPress={() => props.navigation.navigate("AddUser")}
    >
      <Text className="text-[#6F47EB] font-bold text-2xl">Add User</Text>
    </TouchableOpacity>
    <TouchableOpacity
      className="bg-[#fff] rounded-2xl w-80 h-12 justify-center items-center shadow-lg"
      onPress={() => props.navigation.navigate("Users")}
    >
      <Text className="text-[#6F47EB] font-bold text-2xl">Users</Text>
    </TouchableOpacity>
    <TouchableOpacity
      className="bg-[#fff] rounded-2xl w-80 h-12 justify-center items-center shadow-lg"
      onPress={() => props.navigation.navigate("AddTeam")}
    >
      <Text className="text-[#6F47EB] font-bold text-2xl">Add Team</Text>
    </TouchableOpacity>
    <TouchableOpacity
      className="bg-[#fff] rounded-2xl w-80 h-12 justify-center items-center shadow-lg"
      onPress={() => props.navigation.navigate("Teams")}
    >
      <Text className="text-[#6F47EB] font-bold text-2xl">Teams</Text>
    </TouchableOpacity>
    <TouchableOpacity
      className="bg-[#fff] rounded-2xl w-80 h-12 justify-center items-center shadow-lg"
      onPress={() => props.navigation.navigate("AddTask")}
    >
      <Text className="text-[#6F47EB] font-bold text-2xl">Add Task</Text>
    </TouchableOpacity>
    <TouchableOpacity
      className="bg-[#EC2008] rounded-2xl w-80 h-12 justify-center items-center shadow-lg"
      onPress={logOut}
    >
      <Text className="text-[#191717] font-bold text-2xl">Log Out</Text>
    </TouchableOpacity>
  </View>
</SafeAreaView>;
