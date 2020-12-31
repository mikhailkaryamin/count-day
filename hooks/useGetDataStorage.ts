import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useGetDataStorage = (key: string) => {
  const [data, setData] = useState<JSON | null>();

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(key);
        const parseValue = jsonValue !== null ? JSON.parse(jsonValue) : null;

        setData(parseValue);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    };

    getData();
  }, []);

  return data;
};

export default useGetDataStorage;
