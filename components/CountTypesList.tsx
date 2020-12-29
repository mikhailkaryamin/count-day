import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";

import { ColorScheme } from "../consts/consts";

const COUNT_TYPES = [
  { label: "Hour", value: "hour" },
  { label: "Day", value: "day" },
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
  { label: "Year", value: "year" },
];

const CountTypesList = () => {
  const [type, setType] = useState(COUNT_TYPES[1].value);
  return (
    <Picker
      selectedValue={type}
      style={{ height: 50, color: ColorScheme.LIGHT_WHITE }}
      onValueChange={(item) => setType(item.toString())}
      mode="dropdown"
    >
      {COUNT_TYPES.map((typeItem) => (
        <Picker.Item key={typeItem.value} label={typeItem.label} value={typeItem.value}/>
      ))}
    </Picker>
  );
};

export default CountTypesList;
