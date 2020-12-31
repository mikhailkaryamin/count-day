import React, { useState, useContext, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";

import { ActionCreator } from "../actions/actions";

import { AppContext } from "../shared/context";
import { ColorScheme } from "../shared/consts";
import { CountFor } from "../shared/types";

const COUNT_TYPES = [
  { label: "Hour", value: "hour" },
  { label: "Day", value: "day" },
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
  { label: "Year", value: "year" },
] as const;

const CountTypesList = () => {
  const [type, setType] = useState<CountFor>(COUNT_TYPES[1].value);

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
      {COUNT_TYPES.map((typeItem) => (
        <Picker.Item key={typeItem.value} label={typeItem.label} value={typeItem.value}/>
      ))}
    </Picker>
  );
};

export default CountTypesList;
