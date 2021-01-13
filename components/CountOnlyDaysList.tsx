import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import CheckBox from "@react-native-community/checkbox";

import { ActionCreator } from "../actions/actions";

import { AppContext } from "../shared/context";
import { ColorScheme, InitialCurrentEvent } from "../shared/consts";
import { CountOnlySelectedDays } from "../shared/types";

const COUNT_DAYS = [
  { name: "Monday", id: "monday" },
  { name: "Tuesday", id: "tuesday" },
  { name: "Wednesday", id: "wednesday" },
  { name: "Thursday", id: "thursday" },
  { name: "Friday", id: "friday" },
  { name: "Saturday", id: "saturday" },
  { name: "Sunday", id: "sunday" },
];

const CountOnlyDaysList = () => {
  const { state, dispatch } = useContext(AppContext);

  const countOnlySelectionDay = state.currentEvent?.countOnlySelectionDay || InitialCurrentEvent.COUNT_ONLY_SELECTION_DAY;

  const [daysList, setDaysList] = useState<CountOnlySelectedDays>(() => countOnlySelectionDay);

  useEffect(() => {
    dispatch(ActionCreator.setCountOnlySelectedDays(daysList));
  }, [daysList]);

  return (
    <View style={styles.container}>
      {COUNT_DAYS.map((dayItem, i) => {
        const [day, selected] = daysList[i];

        return (
          <View key={day} style={styles.item}>
            <CheckBox
              value={selected}
              tintColors={{ true: ColorScheme.DARK_BLUE_MAIN, false: ColorScheme.DARK_BLUE_MAIN }}
              onValueChange={(value) =>
                setDaysList((daysListPrev) => {
                  const newDaysList = daysListPrev.slice();

                  newDaysList[i][1] = value;
                  return newDaysList;
                })
              }
            />
            <Text style={styles.title}>{`${day}`}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: ColorScheme.LIGHT_WHITE,
  },
});

export default CountOnlyDaysList;
