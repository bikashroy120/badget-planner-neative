import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import services from "../../utils/services";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/SupabaseConfig";
import { client } from "../../utils/KindeConfig";
import Header from "../../component/Header";
import CircularChart from "../../component/CircularChart";
import { Ionicons } from "@expo/vector-icons";
import CategoryList from "../../component/CategoryList";

export default function Page() {
  const router = useRouter();
  const [category, setCategory] = useState();
  const [loading,setLoading]=useState(false)

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    setLoading(true)
    const user = await client.getUserDetails();
    const { data, error } = await supabase
      .from("Category")
      .select("*,CategoryItems(*)")
      .eq("created_by", user.email);
    setCategory(data);
    data&&setLoading(false)
  };

  const isLogin = async () => {
    const login = await services.getData("login");

    console.log(login);

    if (!login) {
      router.push("/login");
    }
  };


  useEffect(() => {
    isLogin();
  }, []);

  return (
    <View style={styles.container}>
      <View className=" w-full">
        <ScrollView refreshControl={
          <RefreshControl 
            onRefresh={()=>getCategory()}
            refreshing={loading}
          />
        }>
          <Header />
          <CircularChart />
          <CategoryList category={category} />
        </ScrollView>
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
