import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const CategoryItemList = ({ categoryList }) => {
  const router = useRouter();

  const routeHandel = (category) => {
    router.push({
      pathname: "category-details",
      params: {
        category: category?.id,
      },
    });
  };

  return (
    <View className="mt-5">
      <Text className=" text-[20px] font-bold">Item List</Text>
      <View>
        {categoryList?.length ? (
          <View>
            {categoryList?.map((item, index) => (
              <TouchableOpacity
                key={index}
                className=" bg-white shadow-sm mt-3 flex flex-row items-center p-3 rounded-xl"
              >
                <View className="w-[70px] h-[70px] rounded-md fle items-center justify-center">
                  <Image
                    source={{ uri: item?.icon }}
                    style={{
                      width: "100%",
                      height: "100%",
                      resizeMode: "cover",
                    }}
                  />
                </View>
                <View className=" ml-2 flex flex-row items-center justify-between flex-1">
                  <View>
                    <Text className=" font-bold text-[17px]">
                      {item?.name}{" "}
                    </Text>
                    <Text className=" text-[15px] font-medium text-gray-500">
                      {item?.note}
                    </Text>
                  </View>
                  <Text className="font-bold text-[18px]">${item?.cost} </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View className=" mt-6">
            <Text className=" text-[25px] text-gray-500 font-bold">
              No Item Found
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default CategoryItemList;

const styles = StyleSheet.create({});
