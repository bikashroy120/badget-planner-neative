import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { decode } from "base64-arraybuffer";
import { supabase } from "../utils/SupabaseConfig";
import { useLocalSearchParams, useRouter } from "expo-router";
import { client } from "../utils/KindeConfig";

const AddCategoryItems = () => {
  const [image, setImage] = useState(null);
  const [upload, setUpload] = useState(null);
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [url, setUrl] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const { category } = useLocalSearchParams();

  //  ==== image picker funcation ======
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setUpload(result.assets[0].base64);
    }
  };

  const handelClick = async () => {
    const fileName = Date.now();
    setLoading(true);

    const getUser = await client.getUserDetails();

    const { data, error } = await supabase.storage
      .from("image")
      .upload(fileName + ".png", decode(upload), {
        contentType: "image/png",
      });

    if (data) {
      const imageName = `https://ikurtkbsvdpzdriuxoie.supabase.co/storage/v1/object/public/image/${data?.path}`;

      const { data: newData, error } = await supabase
        .from("CategoryItems")
        .insert([
          {
            name: name,
            url: url,
            cost: cost,
            note: note,
            icon: imageName,
            category_id: category,
          },
        ])
        .select();

        await supabase
        .from("History")
        .insert([
          {
            title: "Add new category Item",
            note: `Add a new category item name ${name} and budget is ${cost}`,
            budget: cost,
            created_by: getUser.email,
          },
        ])
        .select();

      if (newData) {
        setLoading(false);
        ToastAndroid.show("Category Items Created", ToastAndroid.SHORT);
        router.replace({
          pathname:"category-details",
          params:{
            category:category
          }
        })
      }
    }

    console.log("=========", data, error);
  };

  return (
    <ScrollView>
      <View className="p-5 flex-1">
        <View>
          <TouchableOpacity
            onPress={() => pickImage()}
            style={{ marginVertical: 10 }}
          >
            {image ? (
              <Image
                source={{ uri: image }}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 15,
                  backgroundColor: "gray",
                }}
              />
            ) : (
              <Image
                source={require("../assets/image/image-gallery.jpg")}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 15,
                  backgroundColor: "gray",
                }}
              />
            )}
          </TouchableOpacity>
        </View>
        <View className=" mt-4 border rounded-md px-3 py-3 flex items-center flex-row">
          <MaterialIcons name="title" size={20} color="gray" />
          <TextInput
            className=" flex-1 text-[16px] font-semibold ml-2"
            placeholder="Enter Category Title"
            value={name}
            onChangeText={(value) => setName(value)}
          />
        </View>
        <View className=" mt-4 border  rounded-md px-3 py-3 items-center flex flex-row">
          <Foundation name="dollar" size={30} color="gray" />
          <TextInput
            className=" flex-1 text-[16px] font-semibold ml-3"
            placeholder="Enter Cost"
            value={cost}
            keyboardType="numeric"
            onChangeText={(value) => setCost(value)}
          />
        </View>
        <View className=" mt-4 border  rounded-md px-3 py-3 flex items-center flex-row">
          <Feather name="link-2" size={24} color="gray" />
          <TextInput
            className=" flex-1 text-[16px] font-semibold ml-3"
            placeholder="Enter Url"
            value={url}
            onChangeText={(value) => setUrl(value)}
          />
        </View>
        <View className=" mt-4 border  rounded-md px-3 py-3 items-center flex flex-row">
          <MaterialIcons name="note-alt" size={24} color="gray" />
          <TextInput
            className=" flex-1 text-[16px] font-semibold ml-3"
            placeholder="Enter Note"
            value={note}
            numberOfLines={3}
            onChangeText={(value) => setNote(value)}
          />
        </View>
        <View className="mt-5">
          <TouchableOpacity
            onPress={() => handelClick()}
            disabled={!name || !cost}
            className={`py-3 rounded-md px-5 ${
              !name || !cost || loading ? " bg-gray-500 " : " bg-blue-500"
            }`}
          >
            {loading ? (
              <Text className=" text-center text-white text-[20px] font-bold">
                Loading...
              </Text>
            ) : (
              <Text className=" text-center text-white text-[20px] font-bold">
                Create
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddCategoryItems;

const styles = StyleSheet.create({});
