import React, { useContext } from "react";
import { AppContext } from "../context";
import { ActionCreator } from "../actions/actions";
import {
  TextInput,
  Modal,
  StyleSheet,
  View,
  Button,
} from "react-native";
import DatePicker from "./DatePicker";

const EventEdit: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={state.showModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalItem}>
              <TextInput
                placeholder="Name event (optional)"
                style={{ ...styles.textInput, ...styles.nameEvent }}
                maxLength={100}
              />
            </View>
            <View style={styles.modalItem}>
              <DatePicker />
            </View>
            <View style={styles.modalItem}>
              <Button title="Add event" color="#63f542" onPress={() => ""} />
            </View>
            <View style={styles.modalItem}>
              <Button
                color="#f54542"
                title="Close edit event"
                onPress={() => {
                  dispatch(ActionCreator.showModal(false));
                }}
              />
            </View>
          </View>
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
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
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
  },
  modalItem: {
    alignSelf: "stretch",
    marginBottom: 10,
  },
});

export default EventEdit;
