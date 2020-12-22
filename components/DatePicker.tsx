import React, { useState } from "react";
import { View, Button } from "react-native";
import DateTimePicker, { Event as EventType } from "@react-native-community/datetimepicker";

type Mode = "time" | "date" | undefined;

const DatePicker = () => {
  const [date, setDate] = useState(new Date(1608656967776));
  const [mode, setMode] = useState<Mode>("date");
  const [show, setShow] = useState(false);

  const onChange = (evt: EventType, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const showMode = (currentMode: Mode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View>
      <View>
        <Button onPress={showDatepicker} title="Show date picker" />
      </View>
      <View>
        <Button onPress={showTimepicker} title="Show time picker" />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DatePicker;
