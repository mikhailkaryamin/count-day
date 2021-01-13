import React, { useContext } from "react";
import { View, FlatList, StyleSheet, Text, Pressable } from "react-native";

import { ActionCreator } from "../actions/actions";
import { AppContext } from "../shared/context";
import { ColorScheme, CountTypes } from "../shared/consts";
import { ItemType, RenderItemType, CountOnlySelectedDays, CountFor } from "../shared/types";
import { calculateOffset, calculateOffsetSelectedDays } from "../shared/utils";

import EventItemContainer from "./EventItemContainer";

const getOffsetCount = (date: string, countFor: CountFor, selectedDays: CountOnlySelectedDays) => {
  if (countFor === CountTypes.Day) {
    const isSelectedAllDays = selectedDays.map((dayItem) => dayItem[1]).every((day) => day);

    return (
      isSelectedAllDays ? calculateOffset(date, countFor) : calculateOffsetSelectedDays(date, selectedDays)
    );
  } else {
    return calculateOffset(date, countFor);
  }
};

const EventItem = ({
  title,
  date,
  countDate,
  countType,
  onPressItem,
  prefixOffsetCount,
}: ItemType) => {
  return (
    <EventItemContainer bgColor={ColorScheme.DARK_BLUE_MAIN}>
      <Pressable onPress={onPressItem}>
        <View style={styles.itemContainer}>
          <View style={styles.itemLeft}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.title}>{date}</Text>
          </View>
          <View style={styles.itemRight}>
            <View style={styles.itemRightTop}>
              <Text style={{ ...styles.title }}>
                {prefixOffsetCount}
              </Text>
            </View>
            <View style={styles.itemRightBottom}>
              <Text style={{ ...styles.title, ...styles.countNumber }}>
                {countDate}
              </Text>
              <Text style={{ ...styles.title, ...styles.countType }}>
                {countType}
              </Text>
            </View>
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
        const offsetCount = getOffsetCount(item.date, item.countFor, item.countOnlySelectionDay);
        const countTypeChar = item.countFor.charAt(0);
        const offsetCountStr = offsetCount < 0 ? offsetCount.toString().slice(1) : offsetCount.toString();
        const prefixOffsetCount = offsetCount > 0 ? "passed" : "left";

        return {
          id: item.id,
          title: item.title,
          date: dateEvent,
          countDate: offsetCountStr,
          countType: countTypeChar,
          prefixOffsetCount,
        };
      });

      return formatEvents;
    } else {
      return [];
    }
  };

  const onPressItem = (id: string) => {
    const currentEvent = state.events.filter(
        (eventItem) => eventItem.id === id
    );

    dispatch(ActionCreator.setCurrentEvent(currentEvent[0]));
    dispatch(ActionCreator.showModal(true));
  };

  const renderItem = ({ item }: RenderItemType) => (
    <EventItem
      title={item.title}
      date={item.date}
      countDate={item.countDate}
      countType={item.countType}
      onPressItem={() => onPressItem(item.id)}
      prefixOffsetCount={item.prefixOffsetCount}
    />
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
    flexBasis: "40%",
    borderRadius: 15,
  },
  itemRightTop: {
    flexDirection: "row",
    justifyContent: "center",
  },
  itemRightBottom: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
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
