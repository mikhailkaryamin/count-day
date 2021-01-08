import React, { useEffect, useContext } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

import { AppContext } from "../shared/context";
import { ActionsTypes } from "../shared/types";
import { KeyStorage } from "../shared/consts";

import EventsList from "../components/EventsList";
import EventEdit from "../components/EventEdit";
import ButtonAdd from "../components/ButtonAdd";

const Events = () => {
  const { dispatch } = useContext(AppContext);

  const { getItem } = useAsyncStorage(KeyStorage.EVENT);

  const readEventsFromStorage = async () => {
    const eventsListJSON = await getItem();
    const eventsList = JSON.parse(eventsListJSON);
    dispatch({
      type: ActionsTypes.GetEventsList,
      payload: eventsList
    });
  };

  useEffect(() => {
    readEventsFromStorage();
  }, []);

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
