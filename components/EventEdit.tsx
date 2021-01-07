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

import { useAsyncStorage } from "@react-native-async-storage/async-storage";

import DatePicker from "./DatePicker";
import CountTypesList from "./CountTypesList";
import CountOnlyDaysList from "./CountOnlyDaysList";

import { ActionCreator } from "../actions/actions";

import { AppContext } from "../shared/context";
import { ColorScheme, KeyStorage } from "../shared/consts";

const EventEdit: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const { setItem } = useAsyncStorage(KeyStorage.EVENT);

  const isCountForDay = state.currentEvent?.countFor === "day";
  const currentEvent = JSON.stringify(state.currentEvent);
  // eslint-disable-next-line no-console
  console.log("EventEdit", state);

  const writeItemToStorage = async (eventData) => {
    await setItem(eventData);
  };
  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={state.showModal}>
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
                />
              </View>
              <View style={styles.modalItem}>
                <Text style={styles.modalTitle}>Date</Text>
                <DatePicker />
              </View>
              <View style={{ ...styles.modalSelectCount, ...styles.modalItem }}>
                <Text style={styles.modalTitle}>Count for</Text>
                <CountTypesList />
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
                  title="Add event"
                  color={ColorScheme.LIGHTER_BLUE}
                  onPress={() => writeItemToStorage(currentEvent)}
                />
              </View>
              <View style={styles.modalItem}>
                <Button
                  color={ColorScheme.DARK_BLUE_SUB}
                  title="Close edit event"
                  onPress={() => {
                    dispatch(ActionCreator.showModal(false));
                  }}
                />
              </View>
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
