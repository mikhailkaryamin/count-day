import React, { useContext } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";

import { ActionCreator } from "../actions/actions";
import { AppContext } from "../shared/context";
import { ColorScheme } from "../shared/consts";

import EventItemContainer from "./EventItemContainer";

const ButtonAdd = () => {
  const { dispatch } = useContext(AppContext);

  return (

    <EventItemContainer bgColor={ColorScheme.LIGHTER_BLUE}>
      <View style={styles.container}>
        <Pressable
          onPress={() =>
            dispatch(ActionCreator.showModal(true))
          }
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Add new event</Text>
          </View>
        </Pressable>
      </View>
    </EventItemContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 3,
    borderRadius: 10,
    borderColor: ColorScheme.LIGHTEST_BLUE,
    backgroundColor: ColorScheme.LIGHTEST_BLUE,
  },
  button: {
    alignItems: "center",
    padding: 10,
  },
  buttonText: {
    color: ColorScheme.LIGHT_WHITE,
    fontSize: 24,
  }
});

export default ButtonAdd;
