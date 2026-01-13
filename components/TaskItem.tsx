import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

import { Task } from '../models/task';

interface TaskItemProps {
  task: Task;
  onPress?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
}

export default function TaskItem({ task, onPress, onDelete }: TaskItemProps) {
  const [isSwipeOpen, setIsSwipeOpen] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);
  const statusLabel = task.status === 'completed' ? 'Completed' : 'Pending';
  const statusIcon = task.status === 'completed' ? '●' : '○';
  const statusColor = task.status === 'completed' ? '#16a34a' : '#f59e0b';
  const cardBackground =
    task.status === 'completed' ? '#ecfdf3' : '#fffbeb';

  const renderRightActions = () => {
    if (!onDelete) {
      return null;
    }

    return (
      <Pressable
        style={styles.deleteAction}
        onPress={() => onDelete(task.id)}
      >
        <Text style={styles.deleteActionText}>Delete</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.wrapper}>
      <ReanimatedSwipeable
        renderRightActions={renderRightActions}
        overshootRight={false}
        rightThreshold={24}
        friction={2}
        // Guard against accidental taps while swiping.
        onSwipeableWillOpen={() => {
          setIsSwiping(true);
          setIsSwipeOpen(true);
        }}
        onSwipeableWillClose={() => {
          setIsSwiping(true);
          setIsSwipeOpen(false);
        }}
        onSwipeableOpen={() => {
          setIsSwiping(false);
          setIsSwipeOpen(true);
        }}
        onSwipeableClose={() => {
          setIsSwiping(false);
          setIsSwipeOpen(false);
        }}
      >
        <Pressable
          style={({ pressed }) => [
            styles.card,
            { backgroundColor: cardBackground },
            pressed && onPress && !isSwipeOpen ? styles.cardPressed : null,
          ]}
          onPressIn={() => setIsSwiping(false)}
          onPress={
            onPress && !isSwipeOpen && !isSwiping
              ? () => onPress(task.id)
              : undefined
          }
          disabled={!onPress || isSwipeOpen || isSwiping}
        >
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
        </Pressable>
      </ReanimatedSwipeable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
  card: {
    borderRadius: 12,
    padding: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.85,
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
  deleteAction: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fee2e2',
    borderRadius: 12,
    paddingHorizontal: 20,
    marginBottom: 12,
    width: 88,
    height: '100%',
  },
  deleteActionText: {
    color: '#b91c1c',
    fontSize: 14,
    fontWeight: '600',
  },
});
