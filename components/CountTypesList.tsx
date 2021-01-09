import React, { useState, useContext, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";

import { ActionCreator } from "../actions/actions";

import { AppContext } from "../shared/context";
import { ColorScheme, CountTypes } from "../shared/consts";
import { CountFor } from "../shared/types";

const CountTypesList = () => {
  const [type, setType] = useState<CountFor>(CountTypes.Day);

  const { dispatch } = useContext(AppContext);

  const onChange = (item: CountFor) => {
    setType(item);
  };

  useEffect(() => {
    dispatch(ActionCreator.setCountFor(type));
  }, [type]);

  return (
    <Picker
      selectedValue={type}
      style={{ height: 50, color: ColorScheme.LIGHT_WHITE }}
      onValueChange={onChange}
      mode="dropdown"
    >
      {Object.entries(CountTypes).map((typeItem) => {
        const [key, value] = typeItem;

        return (
          <Picker.Item key={value} label={key} value={value}/>
        );
      })}
    </Picker>
  );
};

export default CountTypesList;
