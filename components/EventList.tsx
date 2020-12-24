import React, { useContext } from "react";
import { View, FlatList, StyleSheet, Text, Pressable } from "react-native";
import { AppContext } from "../context";
import { Types } from "../reducers/reducers";

type ItemType = {
  title: string;
  date: string;
};

type RenderItemType = {
  item: {
    title: string;
    id: string;
    date: string;
  };
};

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
  const { dispatch } = useContext(AppContext);

  return (
    <View style={styles.item}>
      <Pressable
        onPress={() =>
          dispatch({
            type: Types.ShowModal,
            payload: true,
          })
        }
      >
        <View style={styles.itemContainer}>
          <View style={styles.itemLeft}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.title}>{date}</Text>
          </View>
          <View style={styles.itemRight}>
            <Text>25</Text>
          </View>
        </View>
      </Pressable>
    </View>
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
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
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
    borderWidth: 3,
    borderColor: "blue",
    borderRadius: 10,
  },
  itemRight: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    flexBasis: "40%",
  },
  title: {
    fontSize: 20,
  },
});

export default EventList;
