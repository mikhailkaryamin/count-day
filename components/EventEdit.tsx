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
import CheckBox from "@react-native-community/checkbox";

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
  const isHighPriorityFromState = typeof state.currentEvent?.isHighPriority === "boolean";
  const isHighPriority = isHighPriorityFromState ? state.currentEvent?.isHighPriority : InitialCurrentEvent.IS_HIGH_PRIORITY;
  const defaultId = state.currentEvent?.id;
  const eventFromStorage = state.events?.some(
      (eventItem) => eventItem.id === defaultId
  );

  const writeEventsToStorage = async () => {
    const id = await nanoid();

    const currentEvent = {
      "isHighPriority": isHighPriority,
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

    const getEditionEventsList = () => {
      const indexEditionEvent = state.events.findIndex(
          (eventItem) => eventItem.id === defaultId
      );
      const editionEventListSlice = state.events.slice();
      editionEventListSlice[indexEditionEvent] = currentEvent;

      return JSON.stringify(editionEventListSlice);
    };

    if (eventFromStorage) {
      await setItem(getEditionEventsList());
    } else {
      await setItem(getNewEventsList());
    }

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

  const onChangeTitle = (text) => {
    dispatch(ActionCreator.setTitle(text));
  };

  const onChangeIsHighPriority = (value) => {
    dispatch(ActionCreator.setHighPriority(value));
  };

  const onPressSaveButton = () => {
    writeEventsToStorage();
    dispatch(ActionCreator.showModal(false));
    dispatch(ActionCreator.resetCurrentEvent());
  };

  const onPressCancelButton = () => {
    dispatch(ActionCreator.showModal(false));
    dispatch(ActionCreator.resetCurrentEvent());
  };

  const onPressDeleteButton = () => {
    removeEventFromStorage(defaultId);
    dispatch(ActionCreator.showModal(false));
    dispatch(ActionCreator.resetCurrentEvent());
  };

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={state.optionsApp.showModal}
      >
        <View style={styles.wrapper}>
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.item}>
                <Text style={styles.itemTitle}>Title</Text>
                <TextInput
                  placeholderTextColor={ColorScheme.LIGHT_WHITE}
                  placeholder="What is on that day? (optional)"
                  style={{ ...styles.textInput, ...styles.text }}
                  onChangeText={onChangeTitle}
                  maxLength={25}
                  value={title}
                />
              </View>
              <View style={styles.item}>
                <Text style={styles.itemTitle}>Date</Text>
                <DatePicker />
              </View>
              <View style={{ ...styles.item, ...styles.containerHighPriority }}>
                <CheckBox
                  value={isHighPriority}
                  tintColors={{
                    true: ColorScheme.DARK_BLUE_MAIN,
                    false: ColorScheme.DARK_BLUE_MAIN,
                  }}
                  onValueChange={onChangeIsHighPriority}
                />
                <Text style={{ ...styles.text, textAlignVertical: "center" }}>
                  High priority
                </Text>
              </View>
              <View style={{ ...styles.containerSelectCount, ...styles.item }}>
                <Text style={styles.itemTitle}>Count for</Text>
                <CountForList />
              </View>
              {isCountForDay && (
                <View style={styles.item}>
                  <Text style={styles.itemTitle}>
                    Count only selection days
                  </Text>
                  <CountOnlyDaysList />
                </View>
              )}
              <View style={styles.item}>
                <Button
                  title="Save"
                  color={ColorScheme.LIGHTER_BLUE}
                  onPress={onPressSaveButton}
                />
              </View>
              <View style={styles.item}>
                <Button
                  color={ColorScheme.DARK_BLUE_SUB}
                  title="Cancel"
                  onPress={onPressCancelButton}
                />
              </View>
              {eventFromStorage && (
                <View style={styles.item}>
                  <Button
                    color={ColorScheme.DARK_RED}
                    title="Delete"
                    onPress={onPressDeleteButton}
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
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  container: {
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
  textInput: {
    alignSelf: "stretch",
    padding: 5,
    textAlignVertical: "bottom",
    borderColor: "gray",
    borderBottomWidth: 1,
  },
  text: {
    height: 40,
    color: ColorScheme.LIGHT_WHITE,
  },
  item: {
    zIndex: 100,
    alignSelf: "stretch",
    marginBottom: 10,
  },
  itemTitle: {
    color: ColorScheme.LIGHT_WHITE,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  containerSelectCount: {
    zIndex: 150,
  },
  containerHighPriority: {
    flexDirection: "row",
    alignItems: "center",
  }
});

export default EventEdit;
