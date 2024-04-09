import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useGetUser } from "../../hooks/useGetUser";
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";

const Profile = () => {
  const user = useGetUser();
  const router = useRouter()

  return (
    <View>
      <View className="w-full h-[200px] bg-blue-500 rounded-b-[15px]">
        <View className=" absolute bottom-[-45px] bg-white shadow-lg rounded-full overflow-hidden border-2 border-white left-[35%]">
          <Image
            source={{ uri: user?.picture }}
            style={{ width: 100, height: 100, borderRadius: 99 ,resizeMode:'cover' }}
          />
        </View>
      </View>
      <View className=" mt-11 flex items-center justify-center">
        <Text className=" font-semibold text-[20px] mb-1 mt-3">
          {user?.given_name} {user?.family_name} 
        </Text>
        <Text className=" font-semibold text-[16px]">
          {user?.email} 
        </Text>
      </View>

      <View className="p-5  mt-5 flex items-center w-full flex-col">
        <TouchableOpacity onPress={()=>router.push("/")} className=" p-3 px-4 bg-white w-full shadow-lg flex flex-row items-center justify-between rounded-xl">
            <Text className=" text-[18px] font-semibold">
                Home Page 
            </Text>
            <MaterialIcons name="arrow-forward-ios" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>router.push("/history")} className=" p-3 mt-4 px-4 w-full bg-white shadow-lg flex flex-row items-center justify-between rounded-xl">
            <Text className=" text-[18px] font-semibold">
                History Page 
            </Text>
            <MaterialIcons name="arrow-forward-ios" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>router.push("/add-category")} className=" p-3 w-full mt-4 px-4 bg-white shadow-lg flex flex-row items-center justify-between rounded-xl">
            <Text className=" text-[18px] font-semibold">
                Add Category Page 
            </Text>
            <MaterialIcons name="arrow-forward-ios" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity className=" p-3 w-full mt-4 px-4 bg-white shadow-lg flex flex-row items-center justify-between rounded-xl">
            <Text className=" text-[18px] font-semibold">
                Logout
            </Text>
            <MaterialIcons name="logout" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
