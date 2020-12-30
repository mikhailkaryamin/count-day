import React, { useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

import DateTimePicker, {
  Event as EventType,
} from "@react-native-community/datetimepicker";

import { AppContext } from "../shared/context";
import { ActionCreator } from "../actions/actions";

import { ColorScheme } from "../shared/consts";

const DatePicker = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const { dispatch } = useContext(AppContext);

  const onChange = (evt: EventType, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    dispatch(ActionCreator.setDate(currentDate));
    setShow(false);
  };
  const dateString = date?.toLocaleDateString();

  const onPress = () => {
    setShow(true);
  };

  return (
    <View>
      <View>
        <Text onPress={onPress} style={styles.inputDate}>
          {dateString}
        </Text>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputDate: {
    padding: 5,
    marginBottom: 10,
    borderColor: "gray",
    borderBottomWidth: 1,
    color: ColorScheme.LIGHT_WHITE,
  },
});

export default DatePicker;
