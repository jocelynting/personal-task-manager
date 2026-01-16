import { Alert, FlatList, StyleSheet, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';

import TaskItem from '../components/TaskItem';
import { useTasks } from '../context/TasksContext';
import { useMemo, useState } from 'react';

export default function HomeScreen() {
  const router = useRouter();
  const { tasks, deleteTask, toggleTaskStatus } = useTasks();
  const [query, setQuery] = useState('');

  const filteredTasks = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return tasks;
    }

    return tasks.filter((task) =>
      task.title.toLowerCase().includes(trimmed)
    );
  }, [tasks, query]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search tasks..."
        value={query}
        onChangeText={setQuery}
        style={styles.searchInput}
      />
      <FlatList
        data={filteredTasks}
        keyExtractor={(task) => task.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onPress={(taskId) => router.push(`/tasks/${taskId}`)}
            onDelete={(taskId) =>
              Alert.alert(
                'Delete task?',
                'This action cannot be undone.',
                [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => deleteTask(taskId),
                  },
                ]
              )
            }
            onToggleStatus={toggleTaskStatus}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  searchInput: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 15,
    color: '#111827',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
});
