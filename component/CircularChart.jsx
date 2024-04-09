import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import PieChart from "react-native-pie-chart";

const CircularChart = ({ categoryItem }) => {
  const [value, setValue] = useState([1]);
  const [color, setColor] = useState(["#fbd203"]);
  const [totalCost,setTotalCost]=useState(0)
  const colors = ["#4f75fe", "#13c38b", "#9f3cfe", "#ff555d", "#ff7d4f"];
  const widthAndHeight = 150;
  const series = [123, 321, 123, 789, 537];
  const sliceColor = ["#fbd203", "#ffb300", "#ff9100", "#ff6c00", "#ff3c00"];

  const updateChart = () => {
    setValue([]);
    setColor([]);
    let totalCost=0;

    categoryItem?.forEach((item, index) => {
      let itemTotalCost = 0;
      let ortherCost = 0;
      

      if (index < 4) {
        item.CategoryItems?.forEach((item_) => {
          itemTotalCost = itemTotalCost + item_.cost;
          totalCost= totalCost + item_.cost;
        });
        setColor((color) => [...color, colors[index]]);
        setValue((valus) => [...valus, itemTotalCost]);
      } else {
        item.CategoryItems?.forEach((item_) => {
          ortherCost = ortherCost + item_.cost;
          totalCost=totalCost + item_.cost;
        });
        setColor((color) => [...color, colors[4]]);
        setValue((valus) => [...valus, ortherCost]);
      }
    });
    setTotalCost(totalCost)
  };

  useEffect(() => {
    if (categoryItem) {
      updateChart();
    }
  }, [categoryItem]);

  return (
    <View className=" bg-white mx-5 rounded-xl p-5 mt-[-100px]">
      <View className=" flex items-center flex-row mb-4">
        <Text className=" text-[18px] text-gray-500 font-medium">
          Total Estimate :
        </Text>
        <Text className=" text-[17px] font-bold mt-1 ml-1">{totalCost} $</Text>
      </View>
      <View className="flex items-center gap-3 flex-row">
        <PieChart
          widthAndHeight={widthAndHeight}
          series={value}
          sliceColor={color}
          coverRadius={0.65}
          coverFill={"#FFF"}
        />
        <View>
          {categoryItem?.length === 0 ? (
            <View className=" flex items-center gap-1 flex-row">
              <View className=" w-[20px] h-[20px] rounded-full bg-gray-400"></View>
              <Text className=" text-[16px] font-bold text-gray-500">NA</Text>
            </View>
          ) : (
            <View className=" flex gap-1">
              {categoryItem?.map(
                (item, index) =>
                  index <= 4 && (
                    <View key={index} className=" flex items-center gap-1 flex-row">
                      <View
                        className=" w-[20px] h-[20px] rounded-full "
                        style={{ backgroundColor: color[index] }}
                      ></View>
                      <Text className=" text-[16px] font-bold text-gray-500">
                        {index < 4 ? item?.name : "Other"}
                      </Text>
                    </View>
                  )
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default CircularChart;
