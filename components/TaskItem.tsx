import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

import { Task, TaskStatus } from '../models/task';

interface TaskItemProps {
  task: Task;
  onPress?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
  onToggleStatus?: (taskId: string) => void;
}

export default function TaskItem({
  task,
  onPress,
  onDelete,
  onToggleStatus,
}: TaskItemProps) {
  const [isSwipeOpen, setIsSwipeOpen] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);
  const statusLabel =
    task.status === TaskStatus.Completed ? 'Completed' : 'Pending';
  const statusIcon = task.status === TaskStatus.Completed ? '●' : '○';
  const statusColor =
    task.status === TaskStatus.Completed ? '#16a34a' : '#f59e0b';
  const cardBackground =
    task.status === TaskStatus.Completed ? '#ecfdf3' : '#fffbeb';

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
            <Pressable
              style={styles.statusBadge}
              onPress={
                onToggleStatus ? () => onToggleStatus(task.id) : undefined
              }
              disabled={!onToggleStatus}
            >
              <Text style={[styles.statusIcon, { color: statusColor }]}>
                {statusIcon}
              </Text>
            </Pressable>
            <Text style={styles.title}>{task.title}</Text>
          </View>
          <Pressable
            style={styles.statusRow}
            onPress={
              onToggleStatus ? () => onToggleStatus(task.id) : undefined
            }
            disabled={!onToggleStatus}
          >
            <Text style={[styles.status, { color: statusColor }]}>
              {statusLabel}
            </Text>
          </Pressable>
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
    fontSize: 18,
    fontWeight: '700',
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
  statusRow: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
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
