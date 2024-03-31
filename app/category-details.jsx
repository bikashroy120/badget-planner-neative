import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "../utils/SupabaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';

const CategoryDetails = () => {
  const { category } = useLocalSearchParams();
  const [categoryItem, setCategoryItem] = useState();
  const [loading, setLoading] = useState(false);

  console.log("category", categoryItem);

  useEffect(() => {
    if (category) {
      getCategory(category);
    }
  }, [category]);

  const getCategory = async (category) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("Category")
      .select("*,CategoryItems(*)")
      .eq("id", category);
    setCategoryItem(data[0]);
    data && setLoading(false);
  };

  

  return (
    <View className=" mt-10 px-5">
      <View>
        <Ionicons name="arrow-back-circle" size={44} color="black" />
      </View>
      <View>
        <View className=" flex flex-row items-center mt-3">
          <View
            className="w-[70px] h-[70px] flex items-center justify-center rounded-md"
            style={{ backgroundColor: categoryItem?.color }}
          >
            <Text className=" text-[30px] text-white">
              {categoryItem?.icon}
            </Text>
          </View>
          <View className=" flex flex-row items-center ml-2 justify-between flex-1">
            <View>
              <Text className=" text-[20px] font-bold">{categoryItem?.name}</Text>
              <Text className=" text-[16px] font-medium text-gray-500">
                {categoryItem?.CategoryItems?.length} Items
              </Text>
            </View>
            <TouchableOpacity>
              <MaterialIcons name="delete" size={30} color="red" />
            </TouchableOpacity>
          </View>
        </View>

        <View className=" mt-4">
            <View className="flex flex-row items-center justify-between">
              <Text className=" text-[16px] font-semibold">$500</Text>
              <Text className=" text-[16px] font-semibold">Total Budget : ${0}</Text>
            </View>
            <View className=" bg-gray-400 overflow-hidden mt-1 h-[15px] rounded-full w-full">
                <View className=" w-[70%] h-full bg-blue-600"></View>
            </View>
        </View>
      </View>
    </View>
  );
};

export default CategoryDetails;
