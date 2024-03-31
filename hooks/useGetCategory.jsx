import { useEffect, useState } from "react";
import { supabase } from "../utils/SupabaseConfig";
import { client } from "../utils/KindeConfig";

export const useGetCategory = () => {
  const [category, setCategory] = useState();

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    const user = await client.getUserDetails();
    const { data, error } = await supabase
      .from("Category")
      .select("*")
      .eq("created_by", user.email);
    setCategory(data);
  };

  const refetch = ()=>{
    getCategory()
  }

  return {category,refetch};
};
