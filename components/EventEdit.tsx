import React, { useContext } from "react";
import { AppContext } from "../context";
import { ActionCreator } from "../actions/actions";
import {
  TextInput,
  Modal,
  StyleSheet,
  View,
  ScrollView,
  Button,
  Text,
} from "react-native";
import DatePicker from "./DatePicker";
import CountTypesList from "./CountTypesList";
import CountOnlyDaysList from "./CountOnlyDaysList";

import { ColorScheme } from "../consts/consts";

const EventEdit: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

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
              <View style={styles.modalItem}>
                <Text style={styles.modalTitle}>Count only selection days</Text>
                <CountOnlyDaysList />
              </View>
              <View style={styles.modalItem}>
                <Button title="Add event" color={ColorScheme.LIGHTER_BLUE} onPress={() => ""} />
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
  }
});

export default EventEdit;
