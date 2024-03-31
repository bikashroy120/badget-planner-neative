import { StyleSheet, Text, View } from "react-native";
import services from "../../utils/services";
import { Link, useRouter } from "expo-router";
import { useEffect } from "react";
import { supabase } from "../../utils/SupabaseConfig";
import { client } from "../../utils/KindeConfig";
import Header from "../../component/Header";
import CircularChart from "../../component/CircularChart";
import { Ionicons } from "@expo/vector-icons";

export default function Page() {
  const router = useRouter();

  const isLogin = async () => {
    const login = await services.getData("login");

    console.log(login);

    if (!login) {
      router.push("/login");
    }
  };

  const getCategory = async () => {
    const user = await client.getUserDetails();
    const { data, error } = await supabase
      .from("Category")
      .select("*")
      .eq("created_by", user.email);
    console.log(data);
  };

  useEffect(() => {
    isLogin();
    getCategory();
  }, []);

  return (
    <View style={styles.container}>
      <View className=" bg-blue-500 h-[200px] w-full">
        <Header />
        <CircularChart />
      </View>
      <View className=" absolute bottom-4 right-3">
        <Link href={"/add-category"}>
          <Ionicons name="add-circle" size={64} color="green" />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 32,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
