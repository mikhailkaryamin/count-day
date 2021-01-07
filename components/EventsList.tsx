import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

import { ColorScheme, KeyStorage } from "../shared/consts";
import { ItemType, RenderItemType } from "../shared/types";

import EventItemContainer from "./EventItemContainer";

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

const EventsList = () => {
  const [value, setValue] = useState(null);
  const { getItem } = useAsyncStorage(KeyStorage.EVENT);

  const readItemFromStorage = async () => {
    const item = await getItem();
    setValue(item);
  };

  useEffect(() => {
    readItemFromStorage();
  }, []);

  const renderItem = ({ item }: RenderItemType) => (
    <Item title={item.title} date={item.date} />
  );


  return (
    <View style={styles.container}>
      <FlatList
        data={[]}
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
