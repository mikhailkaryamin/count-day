import React, { useContext } from "react";
import { View, FlatList, StyleSheet, Text, Pressable } from "react-native";

import { ActionCreator } from "../actions/actions";
import { AppContext } from "../shared/context";
import { ColorScheme } from "../shared/consts";
import { ItemType, RenderItemType } from "../shared/types";
import { calculateOffset } from "../shared/utils";

import EventItemContainer from "./EventItemContainer";

const EventItem = ({ title, date, countDate, countType, onPressItem }: ItemType) => {
  return (
    <EventItemContainer
      bgColor={ColorScheme.DARK_BLUE_MAIN}
    >
      <Pressable
        onPress={onPressItem}
      >
        <View style={styles.itemContainer}>
          <View style={styles.itemLeft}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.title}>{date}</Text>
          </View>
          <View style={styles.itemRight}>
            <Text style={{ ...styles.title, ...styles.countNumber }}>{countDate}</Text>
            <Text style={{ ...styles.title, ...styles.countType }}>{countType}</Text>
          </View>
        </View>
      </Pressable>
    </EventItemContainer>
  );
};

const EventsList = () => {
  const { state, dispatch } = useContext(AppContext);

  const getFormatEventsList = () => {
    if (state.events?.length) {
      const formatEvents = state.events.map((item) => {
        const dateEvent = new Date(item.date).toLocaleDateString();
        const offsetCount = calculateOffset(item.date, item.countFor);
        const countTypeChar = item.countFor.charAt(0);

        return ({
          id: item.id,
          title: item.title,
          date: dateEvent,
          countDate: offsetCount,
          countType: countTypeChar,
        });
      });

      return formatEvents;
    } else {
      return [];
    }
  };

  const onPressItem = (id: string) => {
    const currentEvent = state.events.filter((eventItem) => eventItem.id === id);

    dispatch(ActionCreator.setCurrentEvent(currentEvent[0]));
    dispatch(ActionCreator.showModal(true));
  };

  const renderItem = ({ item }: RenderItemType) => (
    <EventItem title={item.title} date={item.date} countDate={item.countDate} countType={item.countType} onPressItem={() => onPressItem(item.id)}/>
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
