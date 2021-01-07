import * as React from "react";
import { View, StyleSheet, StatusBar } from "react-native";

import EventsList from "../components/EventsList";
import EventEdit from "../components/EventEdit";
import ButtonAdd from "../components/ButtonAdd";

const Events = () => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <EventsList />
      <EventEdit />
      <ButtonAdd />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007CC7",
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
