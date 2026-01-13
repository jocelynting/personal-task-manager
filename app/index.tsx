import { FlatList, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import TaskItem from '../components/TaskItem';
import { useTasks } from '../context/TasksContext';

export default function HomeScreen() {
  const router = useRouter();
  const { tasks } = useTasks();

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(task) => task.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onPress={(taskId) => router.push(`/tasks/${taskId}`)}
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
  listContent: {
    paddingBottom: 24,
  },
});
