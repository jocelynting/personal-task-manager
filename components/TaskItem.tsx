import { StyleSheet, Text, View } from 'react-native';

import { Task } from '../models/task';

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const statusLabel = task.status === 'completed' ? 'Completed' : 'Pending';
  const statusIcon = task.status === 'completed' ? '●' : '○';
  const statusColor = task.status === 'completed' ? '#16a34a' : '#f59e0b';
  const cardBackground =
    task.status === 'completed' ? '#ecfdf3' : '#fffbeb';

  return (
    <View style={[styles.card, { backgroundColor: cardBackground }]}>
      <View style={styles.titleRow}>
        <Text style={[styles.statusIcon, { color: statusColor }]}>
          {statusIcon}
        </Text>
        <Text style={styles.title}>{task.title}</Text>
      </View>
      <Text style={[styles.status, { color: statusColor }]}>
        {statusLabel}
      </Text>
      <Text style={styles.description} numberOfLines={2}>
        {task.description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  statusIcon: {
    fontSize: 14,
    fontWeight: '700',
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flexShrink: 1,
  },
  status: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#4b5563',
    marginTop: 8,
  },
});
