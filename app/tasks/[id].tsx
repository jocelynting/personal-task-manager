import { StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

import { mockTasks } from '../../data/tasks';
import { TaskStatus } from '../../models/task';

function getStatusLabel(status: TaskStatus) {
  return status === 'completed' ? 'Completed' : 'Pending';
}

export default function TaskDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const taskId = Array.isArray(id) ? id[0] : id;
  const task = mockTasks.find((item) => item.id === taskId);

  if (!task) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Task Details' }} />
        <Text style={styles.notFound}>Task not found.</Text>
      </View>
    );
  }

  const statusColor = task.status === 'completed' ? '#16a34a' : '#f59e0b';
  const statusIcon = task.status === 'completed' ? '●' : '○';
  const cardBackground = task.status === 'completed' ? '#ecfdf3' : '#fffbeb';

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: cardBackground }]}>
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Title</Text>
          <View style={styles.readonlyField}>
            <Text style={styles.titleText}>{task.title}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Description</Text>
          <View style={styles.readonlyField}>
            <Text style={styles.descriptionText}>{task.description}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Status</Text>
          <View style={styles.statusRow}>
            <Text style={[styles.statusIcon, { color: statusColor }]}>
              {statusIcon}
            </Text>
            <Text style={[styles.statusText, { color: statusColor }]}>
              {getStatusLabel(task.status)}
            </Text>
          </View>
        </View>
      </View>
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
  card: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  section: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  readonlyField: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  descriptionText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
  notFound: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 40,
  },
});
