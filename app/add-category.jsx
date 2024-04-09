import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import ColorPiker from "../component/ColorPiker";
import { MaterialIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { client } from "../utils/KindeConfig";
import { supabase } from "../utils/SupabaseConfig";
import { useRouter } from "expo-router";

const AddCategory = () => {
  const [color, setColor] = useState("#4f75fe");
  const [title, setTitle] = useState("");
  const [budget, setBudget] = useState("");
  const [icon, setIcon] = useState("IC");
  const [loading,setLoading]=useState(false)
  const router = useRouter()

  const onCreateCategory = async () => {
    setLoading(true)
    const getUser = await client.getUserDetails();
    const { data, error } = await supabase
      .from("Category")
      .insert([
        {
          name: title,
          color: color,
          icon: icon,
          assigned_budget: budget,
          created_by: getUser.email,
        },
      ])
      .select();

     await supabase
      .from("History")
      .insert([
        {
          title: "Add new category",
          note: `Add a new category name ${title} and budget is ${budget}`,
          budget: budget,
          created_by: getUser.email,
        },
      ])
      .select();


      if (data) {
        setLoading(false);
        ToastAndroid.show("Category Created", ToastAndroid.SHORT);
        router.replace({
          pathname:"/category-details",
          params:{
            category:data[0]?.id
          }
        })
      }

    console.log(data);
    // if (data) {
    //   ToastAndroid.show("Category Created", ToastAndroid.SHORT);
    // }
  };

  return (
    <View className="p-5">
      <View className=" flex items-center mt-5">
        <View
          className="flex items-center justify-center py-5 px-6 rounded-full"
          style={{ backgroundColor: color }}
        >
          <TextInput
            maxLength={2}
            className=" text-white font-bold text-[25px]"
            onChangeText={(value) => setIcon(value)}
          >
            {icon}
          </TextInput>
        </View>
        <ColorPiker color={color} setColor={setColor} />
      </View>
      <View className=" mt-4 border bg-white rounded-md px-3 py-3 flex items-center flex-row">
        <MaterialIcons name="title" size={20} color="gray" />
        <TextInput
          className=" flex-1 text-[16px] font-semibold ml-2"
          placeholder="Enter Category Title"
          value={title}
          onChangeText={(value) => setTitle(value)}
        />
      </View>
      <View className=" mt-4 border bg-white rounded-md px-3 py-3 flex flex-row">
        <Foundation name="dollar" size={30} color="gray" />
        <TextInput
          className=" flex-1 text-[16px] font-semibold ml-3"
          placeholder="Enter Category Title"
          value={budget}
          keyboardType="numeric"
          onChangeText={(value) => setBudget(value)}
        />
      </View>

      <View className="mt-5">
        <TouchableOpacity
          onPress={() => onCreateCategory()}
          disabled={!title || !budget || loading}
          className={`py-3 rounded-md px-5 ${
            !title || !budget ? " bg-gray-500 " : " bg-blue-500"
          }`}
        >
          <Text className=" text-center text-white text-[20px] font-bold">
              {loading ? "Loading..." : "Create"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddCategory;

const styles = StyleSheet.create({});
