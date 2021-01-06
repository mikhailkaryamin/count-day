import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

import { StatusStorageType } from "../shared/types";
import { StatusStorage } from "../shared/consts";

const useRemoveItem = (key: string) => {
  const [status, setStatus] = useState<StatusStorageType>();

  useEffect(() => {
    const removeValue = async () => {
      try {
        await AsyncStorage.removeItem(key);
        setStatus(StatusStorage.SUCCESS);
      } catch (e) {
        setStatus(StatusStorage.ERROR);
        // eslint-disable-next-line no-console
        console.log(e);
      }
    };

    removeValue();
  }, []);

  return status;
};

export default useRemoveItem;
