import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";

import { ColorScheme } from "../shared/consts";
import { ItemType, RenderItemType } from "../shared/types";

import EventItemContainer from "./EventItemContainer";

const MOCK_DATA = [
  {
    id: Math.random().toString(12).substring(0),
    title: "День рождение 1",
    date: "25/12/20",
  },
  {
    id: Math.random().toString(12).substring(0),
    title: "День рождение 2",
    date: "26/12/20",
  },
  {
    id: Math.random().toString(12).substring(0),
    title: "День рождение 3",
    date: "21/12/20",
  },
  {
    id: Math.random().toString(12).substring(0),
    title: "День рождение 4",
    date: "29/12/20",
  },
];

const Item = ({ title, date }: ItemType) => {
  return (
    <EventItemContainer
      bgColor={ColorScheme.DARK_BLUE_MAIN}
    >
      <View style={styles.itemContainer}>
        <View style={styles.itemLeft}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.title}>{date}</Text>
        </View>
        <View style={styles.itemRight}>
          <Text style={{ ...styles.title, ...styles.countNumber }}>25</Text>
          <Text style={{ ...styles.title, ...styles.countType }}>d</Text>
        </View>
      </View>
    </EventItemContainer>
  );
};

const EventList = () => {
  const renderItem = ({ item }: RenderItemType) => (
    <Item title={item.title} date={item.date} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
  },
  itemLeft: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    flexBasis: "60%",
  },
  itemRight: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    flexBasis: "40%",
    flexDirection: "row",
    borderRadius: 15,
  },
  title: {
    fontSize: 20,
    color: ColorScheme.LIGHT_WHITE,
  },
  countNumber: {
    fontSize: 45,
    paddingRight: 5,
  },
  countType: {
    fontSize: 32,
  },
});

export default EventList;
