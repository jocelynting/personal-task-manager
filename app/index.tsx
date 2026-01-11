import { FlatList, StyleSheet, Text, View } from 'react-native';

import TaskItem from '../components/TaskItem';
import { mockTasks } from '../data/tasks';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Tasks</Text>
      <FlatList
        data={mockTasks}
        keyExtractor={(task) => task.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <TaskItem task={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingTop: 56,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
});
