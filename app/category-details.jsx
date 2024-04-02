import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { supabase } from "../utils/SupabaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import CategoryItemList from "../component/CategoryItemList";

const CategoryDetails = () => {
  const { category } = useLocalSearchParams();
  const [categoryItem, setCategoryItem] = useState();
  const [loading, setLoading] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [persen, setPersen] = useState(0);

  console.log("category", totalCost);

  useEffect(() => {
    if (category) {
      getCategory(category);
    }
  }, [category]);

  useEffect(() => {
    if (categoryItem) {
      calculateTotalPerc();
    }
  }, [categoryItem]);

  const calculateTotalPerc = () => {
    let total = 0;
    categoryItem?.CategoryItems?.forEach((item) => {
      total = total + item.cost;
    });
    setTotalCost(total);
    let perc = (total / categoryItem.assigned_budget) * 100;
    if (perc > 100) {
      perc = 100;
    }
    setPersen(perc);
  };

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
    <View className=" flex-1 mt-10 ">
      <View className="px-5">
        <Link href={"/"}>
          <Ionicons name="arrow-back-circle" size={44} color="black" />
        </Link>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={() => getCategory(category)}
            refreshing={loading}
          />
        }
      >
        <View className="px-5">
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
                <Text className=" text-[20px] font-bold">
                  {categoryItem?.name}
                </Text>
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
              <Text className=" text-[16px] font-semibold">${totalCost}</Text>
              <Text className=" text-[16px] font-semibold">
                Total Budget : ${categoryItem?.assigned_budget}
              </Text>
            </View>
            <View className=" bg-gray-400 overflow-hidden mt-1 h-[15px] rounded-full w-full">
              <View
                style={{ width: persen + "%" }}
                className=" w-[70%] h-full bg-blue-600"
              ></View>
            </View>
          </View>
          <CategoryItemList categoryList={categoryItem?.CategoryItems} />
        </View>
      </ScrollView>
      <View className=" absolute bottom-4 right-3">
        <Link
          href={{
            pathname: "/add-category-item",
            params: { category: category },
          }}
        >
          <Ionicons name="add-circle" size={64} color="green" />
        </Link>
      </View>
    </View>
  );
};

export default CategoryDetails;
