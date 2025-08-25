import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import api from "../api/api";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

export default function TaskListScreen({ navigation }: any) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const res = await api.get<Task[]>("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log("Error cargando tareas", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Tareas</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.task}
            onPress={() => navigation.navigate("TaskDetail", { task: item })}
          >
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text>{item.status}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  task: { padding: 15, backgroundColor: "#f2f2f2", marginBottom: 10, borderRadius: 8 },
  taskTitle: { fontSize: 18, fontWeight: "500" },
});