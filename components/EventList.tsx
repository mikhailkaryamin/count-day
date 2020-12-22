import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Button,
  Alert
} from "react-native";

type ItemType = {
  title: string;
};

type RenderItemType = {
  item: {
    title: string;
    id: string;
  };
};

const MOCK_DATA = [
  {
    id: Math.random().toString(12).substring(0),
    title: "День рождение 1",
  },
  {
    id: Math.random().toString(12).substring(0),
    title: "День рождение 2",
  },
  {
    id: Math.random().toString(12).substring(0),
    title: "День рождение 3",
  },
  {
    id: Math.random().toString(12).substring(0),
    title: "День рождение 4",
  },
];

const Item = ({ title }: ItemType) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Button
      title="Press me"
      onPress={() => Alert.alert("Simple Button pressed")}
    />
  </View>
);

const EventList = () => {
  const renderItem = ({ item }: RenderItemType) => <Item title={item.title} />;

  return (
    <FlatList
      data={MOCK_DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default EventList;
