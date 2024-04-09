import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { client } from "../../utils/KindeConfig";
import { supabase } from "../../utils/SupabaseConfig";
import { MaterialIcons } from '@expo/vector-icons';

const history = () => {
  const [history, setHistory] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    setLoading(true);
    const user = await client.getUserDetails();
    const { data, error } = await supabase
      .from("History")
      .select("*")
      .eq("created_by", user.email);
    setHistory(data);
    data && setLoading(false);
  };

  console.log(history);

  return (
    <View className=" flex-1 pt-5 ">

      <View className="px-5 mt-7">
        <Text className=" text-[20px] font-bold">
          History List
        </Text>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={() => getCategory()}
            refreshing={loading}
          />
        }
      >
        <View className="px-5">
          {
            history?.map((item,index)=>(
              <View key={index} className="flex flex-1 mt-3 border-b border-gray-400 pb-4 flex-row w-full items-center">
                  <View className=" w-[70px] h-[70px] rounded-md bg-blue-400 flex items-center justify-center">
                    <MaterialIcons name="notifications-active" size={34} color="#fff" />
                  </View>
                  <View className=" ml-2 w-[75%]">
                      <Text className=" text-[16px] font-bold">{item?.title}</Text>
                      <Text className=" text-[15px] font-bold">{item?.budget}</Text>
                      <Text className=" text-[14px] w-full font-medium text-gray-400">{item?.note}</Text>
                  </View>
              </View>
            ))
          }
        </View>
      </ScrollView>
    </View>
  );
};

export default history;
