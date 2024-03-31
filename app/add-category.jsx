import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import ColorPiker from "../component/ColorPiker";

const AddCategory = () => {
  const [color, setColor] = useState("#4f75fe");
  const [icon, setIcon] = useState("IC");

  return (
    <View className="p-5">
      <View className=" flex items-center">
        <View
          className="flex items-center justify-center py-5 px-6 rounded-full"
          style={{ backgroundColor: color }}
        >
          <TextInput
            maxLength={2}
            className=" text-white font-bold text-[25px]"
            onChangeText={(value)=>setIcon(value)}
          >
            {icon}
          </TextInput>
        </View>
        <ColorPiker color={color} setColor={setColor}/>
      </View>
    </View>
  );
};

export default AddCategory;

const styles = StyleSheet.create({});
