import * as React from "react";
import { View, StyleSheet, StatusBar } from "react-native";

import EventList from "../components/EventList";
import EventEdit from "../components/EventEdit";

const Events = () => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <EventList />
      <EventEdit />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

export default Events;
