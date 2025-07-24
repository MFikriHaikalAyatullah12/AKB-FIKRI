import { FontAwesome6 } from "@expo/vector-icons";
import { FlatList, StyleSheet, Text, View } from "react-native";

const iconData = [
  { key: "1", name: "angry", label: "Rage Demon" },
  { key: "2", name: "grin-stars", label: "Starry Smile" },
  { key: "3", name: "grin-tongue-squint", label: "Cheeky Grin" },
  { key: "4", name: "flushed", label: "Flustered Face" },
  { key: "5", name: "kiss-beam", label: "Beaming Kiss" },
  { key: "6", name: "dizzy", label: "Dizzy Spell" },
  { key: "7", name: "kiss", label: "Sweet Kiss" },
  { key: "8", name: "grin-wink", label: "Winking Charm" },
  { key: "9", name: "grin-alt", label: "Classic Smirk" },
  { key: "10", name: "frown-open", label: "Open Disdain" }
];

export default function Index() {
  const renderIcon = ({ item }: any) => (
    <View style={styles.itemBox}>
      <FontAwesome6 name={item.name} size={38} color="#3e64a8" />
      <Text style={styles.itemText}>{item.label}</Text>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <Text style={styles.header}>10 Facial Expressions</Text>
      <FlatList
        data={iconData}
        renderItem={renderIcon}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#eaf1f8",
    paddingHorizontal: 14,
    paddingTop: 30,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
    color: "#2b3d52",
  },
  listContent: {
    paddingBottom: 20,
  },
  columnStyle: {
    justifyContent: "space-between",
    marginBottom: 18,
  },
  itemBox: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 18,
    marginHorizontal: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  itemText: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: "600",
    color: "#3e64a8",
    textAlign: "center",
    textTransform: "uppercase",
  },
});
