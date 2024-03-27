import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { client } from "../../utils/KindeConfig";
import services from "../../utils/services"
import { useRouter } from "expo-router";

const LoginScreen = () => {

  const router = useRouter()

  const handleSignIn = async () => {
    const token = await client.login();
    if (token) {
        await services.storeData("login","true")
        router.replace("/")
    }
  };


  return (
    <View className=" flex-1 bg-white ">
      <Image
        source={require("../../assets/image/unnamed.png")}
        style={{ width: "100%", marginTop: 50, height: 400 }}
      />

      <View className=" bg-blue-700 flex-1 mt-[-50px] rounded-t-3xl p-5">
        <Text className=" text-[30px] text-center text-white font-bold">
          Personal Budget Planner
        </Text>
        <Text className=" text-white text-center text-[16px] mt-4 font-semibold">
          Stay on Track Event by Event: Your Personal Budget Planner App!
        </Text>
        <TouchableOpacity onPress={()=>{handleSignIn()}} className="w-full bg-white py-3 mt-7 rounded-full px-5">
            <Text className=" text-center text-blue-500 font-semibold text-[20px]">Login/SignUp</Text>
        </TouchableOpacity>
        <Text className=" text-white font-semibold text-[14px] mt-4">*By login/signup you will agree to our teams and conditions</Text>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
