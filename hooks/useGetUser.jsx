import { useEffect, useState } from "react";
import { client } from "../utils/KindeConfig";

export const useGetUser = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const getUser = await client.getUserDetails();
    setUser(getUser);
  };

  return user;
};
