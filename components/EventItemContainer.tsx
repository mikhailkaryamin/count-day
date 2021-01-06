import React from "react";
import { View, StyleSheet } from "react-native";

import { EventItemContainerType } from "../shared/types";

const EventItemContainer = ({ children, bgColor }: EventItemContainerType) => {
  return (
    <View style={{ ...styles.item, backgroundColor: bgColor }}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default EventItemContainer;
