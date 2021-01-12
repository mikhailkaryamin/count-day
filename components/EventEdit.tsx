import React, { useContext } from "react";
import {
  TextInput,
  Modal,
  StyleSheet,
  View,
  ScrollView,
  Button,
  Text,
} from "react-native";
import { nanoid } from "nanoid/async/index.native";

import { useAsyncStorage } from "@react-native-async-storage/async-storage";

import DatePicker from "./DatePicker";
import CountForList from "./CountForList";
import CountOnlyDaysList from "./CountOnlyDaysList";

import { ActionCreator } from "../actions/actions";

import { AppContext } from "../shared/context";
import { ColorScheme, KeyStorage, InitialCurrentEvent } from "../shared/consts";
import { PropsEventEdit } from "../shared/types";

const EventEdit = ({ onNeededRead }: PropsEventEdit) => {
  const { state, dispatch } = useContext(AppContext);
  const { setItem, removeItem } = useAsyncStorage(KeyStorage.EVENT);

  const isCountForDay = state.currentEvent?.countFor === "day";

  const title = state.currentEvent?.title || InitialCurrentEvent.TITLE;
  const defaultId = state.currentEvent?.id;
  const eventFromStorage = state.events?.some(
      (eventItem) => eventItem.id === defaultId
  );

  const writeEventsToStorage = async () => {
    const id = defaultId || (await nanoid());

    const currentEvent = {
      id,
      ...state.currentEvent,
    };

    const getNewEventsList = () => {
      let newEventsList;

      if (state.events === null) {
        newEventsList = JSON.stringify([currentEvent]);
      } else if (Array.isArray(state.events)) {
        newEventsList = JSON.stringify([...state.events, currentEvent]);
      } else {
        newEventsList = [];
      }

      return newEventsList;
    };

    await setItem(getNewEventsList());
    onNeededRead();
  };

  const removeEventFromStorage = async (id: string) => {
    if (!state.events !== null) {
      const newEventsList = state.events.filter(
          (eventItem) => eventItem.id !== id
      );

      if (newEventsList.length) {
        const newEventsListJSON = JSON.stringify(newEventsList);
        await setItem(newEventsListJSON);
      } else {
        await removeItem();
      }

      onNeededRead();
    }
  };

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={state.optionsApp.showModal}
      >
        <View style={styles.centeredView}>
          <ScrollView>
            <View style={styles.modalView}>
              <View style={styles.modalItem}>
                <Text style={styles.modalTitle}>Title</Text>
                <TextInput
                  placeholderTextColor={ColorScheme.LIGHT_WHITE}
                  placeholder="What is on that day? (optional)"
                  style={{ ...styles.textInput, ...styles.nameEvent }}
                  onChangeText={(text) => {
                    dispatch(ActionCreator.setTitle(text));
                  }}
                  maxLength={25}
                  value={title}
                />
              </View>
              <View style={styles.modalItem}>
                <Text style={styles.modalTitle}>Date</Text>
                <DatePicker />
              </View>
              <View style={{ ...styles.modalSelectCount, ...styles.modalItem }}>
                <Text style={styles.modalTitle}>Count for</Text>
                <CountForList />
              </View>
              {isCountForDay && (
                <View style={styles.modalItem}>
                  <Text style={styles.modalTitle}>
                    Count only selection days
                  </Text>
                  <CountOnlyDaysList />
                </View>
              )}
              <View style={styles.modalItem}>
                <Button
                  title="Save"
                  color={ColorScheme.LIGHTER_BLUE}
                  onPress={() => {
                    writeEventsToStorage();
                    dispatch(ActionCreator.showModal(false));
                    dispatch(ActionCreator.resetCurrentEvent());
                  }}
                />
              </View>
              <View style={styles.modalItem}>
                <Button
                  color={ColorScheme.DARK_BLUE_SUB}
                  title="Cancel"
                  onPress={() => {
                    dispatch(ActionCreator.showModal(false));
                    dispatch(ActionCreator.resetCurrentEvent());
                  }}
                />
              </View>
              {eventFromStorage && (
                <View style={styles.modalItem}>
                  <Button
                    color={ColorScheme.DARK_RED}
                    title="Delete"
                    onPress={() => {
                      removeEventFromStorage(defaultId);
                      dispatch(ActionCreator.showModal(false));
                      dispatch(ActionCreator.resetCurrentEvent());
                    }}
                  />
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  modalView: {
    margin: 20,
    backgroundColor: ColorScheme.LIGHTEST_BLUE,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  textInput: {
    alignSelf: "stretch",
    padding: 5,
    textAlignVertical: "bottom",
    borderColor: "gray",
    borderBottomWidth: 1,
  },
  nameEvent: {
    height: 40,
    color: ColorScheme.LIGHT_WHITE,
  },
  modalItem: {
    zIndex: 100,
    alignSelf: "stretch",
    marginBottom: 10,
  },
  modalSelectCount: {
    zIndex: 150,
  },
  modalTitle: {
    color: ColorScheme.LIGHT_WHITE,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default EventEdit;
