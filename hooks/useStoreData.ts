import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { EventType, StatusStorageType } from "../shared/types";

const useStoreData = (value: EventType, key: string) => {
  const [status, setStatus] = useState<StatusStorageType>();

  useEffect(() => {
    const storeData = async () => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
        setStatus("success");
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        setStatus("error");
      }
    };

    storeData();
  }, []);

  return status;
};

export default useStoreData;
