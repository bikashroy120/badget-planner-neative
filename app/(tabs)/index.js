import { StyleSheet, Text, View } from "react-native";
import services from "../../utils/services";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Page() {

  const router = useRouter()


  useEffect(()=>{
    isLogin()
  },[])


  const isLogin = async()=>{
    const login = await services.getData("login")

    console.log(login)

    if(!login){
      router.push("/login")
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Hello World</Text>
        <Text style={styles.subtitle}>This is the first page of your app.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
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
