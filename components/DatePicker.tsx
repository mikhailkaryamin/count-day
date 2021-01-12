import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import DateTimePicker, {
  Event as EventType,
} from "@react-native-community/datetimepicker";

import { ActionCreator } from "../actions/actions";

import { AppContext } from "../shared/context";
import { ColorScheme, InitialCurrentEvent } from "../shared/consts";

const DatePicker = () => {
  const { state, dispatch } = useContext(AppContext);

  const defaultDate = InitialCurrentEvent.DATE;
  const isNullCurrentEvent = state.currentEvent === null;

  const [date, setDate] = useState(() => {
    const initialDate = isNullCurrentEvent ? new Date(defaultDate) : new Date();

    return initialDate;
  });

  const [show, setShow] = useState(false);

  const onChange = (evt: EventType, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };
  const dateString = date?.toLocaleDateString();

  const onPress = () => {
    setShow(true);
  };

  useEffect(() => {
    setShow(false);
  });

  useEffect(() => {
    const dateJSON = date.toJSON();

    dispatch(ActionCreator.setDate(dateJSON));
    setShow(false);
  }, [date]);

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
