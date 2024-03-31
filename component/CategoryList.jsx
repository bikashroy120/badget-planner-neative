import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const CategoryList = ({ category }) => {
  return (
    <View className=" p-5">
      <Text className=" text-[20px] font-bold">Latest Budget</Text>
      <View>
        {category?.map((item, index) => (
          <TouchableOpacity
            key={index}
            className=" bg-white shadow-sm mt-3 flex flex-row items-center p-3 rounded-xl"
          >
            <View
              className="w-[70px] h-[70px] rounded-md fle items-center justify-center"
              style={{ backgroundColor: item?.color }}
            >
              <Text className=" text-white text-[30px]">{item?.icon}</Text>
            </View>
            <View className=" ml-2 flex flex-row items-center justify-between flex-1">
              <View>
                <Text className=" font-bold text-[20px]">{item?.name} </Text>
                <Text className=" text-[16px] font-medium text-gray-500">
                  {item?.CategoryItems?.length} Items
                </Text>
              </View>
              <Text className="font-bold text-[18px]">${item?.assigned_budget} </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({});
