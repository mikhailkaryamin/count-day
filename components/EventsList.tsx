import React, { useContext } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";

import { AppContext } from "../shared/context";
import { ColorScheme } from "../shared/consts";
import { ItemType, RenderItemType } from "../shared/types";

import EventItemContainer from "./EventItemContainer";

const Item = ({ title, date, countDate }: ItemType) => {
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
          <Text style={{ ...styles.title, ...styles.countNumber }}>{countDate}</Text>
          <Text style={{ ...styles.title, ...styles.countType }}>d</Text>
        </View>
      </View>
    </EventItemContainer>
  );
};

const EventsList = () => {
  const { state } = useContext(AppContext);
  console.log("EventsList", state.events, state);
  const getFormatEventsList = () => {
    if (state.events?.length) {
      const formatEvents = state.events.map((item) => {
        const itemDate = new Date(item.date);
        return ({
          id: item.id,
          title: item.title,
          date: itemDate.toLocaleDateString(),
          countDate: "25",
        });
      });

      return formatEvents;
    } else {
      return [];
    }
  };

  const renderItem = ({ item }: RenderItemType) => (
    <Item title={item.title} date={item.date} countDate={item.countDate} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={getFormatEventsList()}
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

export default EventsList;
