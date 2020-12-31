import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

const useGetAllKeysStorage = () => {
  const [allKeysStorage, setAllKeysStorage] = useState([]);

  useEffect(() => {
    const getAllKeys = async () => {
      let keys = [];
      try {
        keys = await AsyncStorage.getAllKeys();
        setAllKeysStorage(keys);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    };

    getAllKeys();
  }, []);

  return allKeysStorage;
};

export default useGetAllKeysStorage;

