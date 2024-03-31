import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const ColorPiker = ({ color, setColor }) => {
  const colors = ["#4f75fe", "#13c38b", "#9f3cfe", "#ff555d", "#ff7d4f"];

  return (
    <View className=" flex items-center flex-row gap-3 mt-2">
      {colors.map((item, index) => (
        <TouchableOpacity
          onPress={() => setColor(item)}
          key={index}
          className="w-[30px] rounded-full h-[30px]"
          style={[
            { backgroundColor: item },
            item === color && { borderWidth: 4 },
          ]}
        ></TouchableOpacity>
      ))}
    </View>
  );
};

export default ColorPiker;

const styles = StyleSheet.create({});
