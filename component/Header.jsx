import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useGetUser } from "../hooks/useGetUser";
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
  const user = useGetUser();
  console.log(user);
  return (
    <View className="p-5 flex items-start bg-blue-500 h-[200px] flex-row justify-between">
      <View className=" flex flex-row  items-center gap-3">
        <Image
          source={{ uri: user?.picture }}
          style={{ width: 60, height: 60, borderRadius: 99 }}
        />
        <View>
          <Text className=" text-white font-bold text-[20px]">Welcome</Text>
          <Text className=" text-white font-semibold text-[16px]">
            {user?.given_name}
          </Text>
        </View>
      </View>
      <TouchableOpacity>
        <Ionicons name="notifications" size={27} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
