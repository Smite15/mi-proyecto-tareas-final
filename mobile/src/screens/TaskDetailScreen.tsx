import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TaskDetailScreen({ route }: any) {
  const { task } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text>{task.description}</Text>
      <Text style={{ marginTop: 10 }}>Estado: {task.status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
});