import { View, Text } from "react-native";
import React from "react";
import PieChart from "react-native-pie-chart";

const CircularChart = () => {
  const widthAndHeight = 150;
  const series = [123, 321, 123, 789, 537];
  const sliceColor = ["#fbd203", "#ffb300", "#ff9100", "#ff6c00", "#ff3c00"];

  return (
    <View className=" bg-white mx-5 rounded-xl p-5 mt-[-100px]">
      <View className=" flex items-center flex-row mb-4">
        <Text className=" text-[18px] text-gray-500 font-medium">Total Estimate :</Text>
        <Text className=" text-[17px] font-bold mt-1 ml-1">0$</Text>
      </View>
      <View className="flex items-center gap-3 flex-row">
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          coverRadius={0.65}
          coverFill={"#FFF"}
        />
        <View className=" flex items-center gap-1 flex-row">
          <View className=" w-[20px] h-[20px] rounded-full bg-gray-400"></View>
          <Text className=" text-[16px] font-bold text-gray-500">NA</Text>
        </View>
      </View>
    </View>
  );
};

export default CircularChart;
