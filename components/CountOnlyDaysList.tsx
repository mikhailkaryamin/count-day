import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CheckBox from "@react-native-community/checkbox";

const COUNT_DAYS = [
  { name: "Monday", id: "monday" },
  { name: "Tuesday", id: "tuesday" },
  { name: "Wednesday", id: "wednesday" },
  { name: "Thursday", id: "thursday" },
  { name: "Friday", id: "friday" },
  { name: "Saturday", id: "saturday" },
  { name: "Sunday", id: "sunday" },
];

const CHECK_LIST = {
  monday: true,
  tuesday: true,
  wednesday: true,
  thursday: true,
  friday: true,
  saturday: true,
  sunday: true,
};

const CountOnlyDaysList = () => {
  const [checkList, setCheckList] = useState(CHECK_LIST);

  return (
    <View style={styles.container}>
      {COUNT_DAYS.map((day) => {
        return (
          <View key={day.id} style={styles.item}>
            <CheckBox
              value={checkList[day.id]}
              onValueChange={(value) =>
                setCheckList((checkListPrev) => {
                  const currentDay = day.id;
                  return {
                    ...checkListPrev,
                    [currentDay]: value,
                  };
                })
              }
            />
            <Text>{`${day.name}`}</Text>
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
    alignItems: "center"
  },
});

export default CountOnlyDaysList;
