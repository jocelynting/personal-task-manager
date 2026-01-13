import { useEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

import { TaskStatus } from '../../models/task';
import { useTasks } from '../../context/TasksContext';

function getStatusLabel(status: TaskStatus) {
  return status === 'completed' ? 'Completed' : 'Pending';
}

export default function TaskDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const taskId = Array.isArray(id) ? id[0] : id;
  const { tasks, updateTask, deleteTask } = useTasks();
  const task = tasks.find((item) => item.id === taskId);
  const [title, setTitle] = useState(task?.title ?? '');
  const [description, setDescription] = useState(task?.description ?? '');
  const [status, setStatus] = useState<TaskStatus>(
    task?.status ?? 'pending'
  );
  const [error, setError] = useState('');

  useEffect(() => {
    if (!task) {
      return;
    }

    // Keep form fields in sync when the task changes.
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
  }, [task]);

  if (!task) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Task Details' }} />
        <Text style={styles.notFound}>Task not found.</Text>
      </View>
    );
  }

  const statusColor = status === 'completed' ? '#16a34a' : '#f59e0b';
  const statusIcon = status === 'completed' ? '●' : '○';
  const cardBackground = status === 'completed' ? '#ecfdf3' : '#fffbeb';

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: cardBackground }]}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Title</Text>
            <Pressable
              onPress={() =>
                Alert.alert('Delete task?', 'This action cannot be undone.', [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                      deleteTask(task.id);
                      router.back();
                    },
                  },
                ])
              }
              style={styles.deleteInlineButton}
            >
              <Text style={styles.deleteInlineText}>Delete</Text>
            </Pressable>
          </View>
          <TextInput
            value={title}
            onChangeText={(value) => {
              setTitle(value);
              if (error) {
                setError('');
              }
            }}
            placeholder="Enter a task title"
            style={styles.input}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionLabel, styles.sectionLabelSpacing]}>
            Description
          </Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Optional details"
            style={[styles.input, styles.textArea]}
            multiline
            textAlignVertical="top"
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionLabel, styles.sectionLabelSpacing]}>
            Status
          </Text>
          <Pressable
            style={styles.statusRow}
            onPress={() =>
              setStatus(status === 'completed' ? 'pending' : 'completed')
            }
          >
            <Text style={[styles.statusIcon, { color: statusColor }]}>
              {statusIcon}
            </Text>
            <Text style={[styles.statusText, { color: statusColor }]}>
              {getStatusLabel(status)}
            </Text>
          </Pressable>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Pressable
          style={styles.saveButton}
          onPress={() => {
            if (!title.trim()) {
              setError('Title is required.');
              return;
            }

            updateTask(task.id, {
              title: title.trim(),
              description: description.trim(),
              status,
            });
            setError('');
            router.back();
          }}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  card: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  sectionLabelSpacing: {
    marginBottom: 10,
  },
  deleteInlineButton: {
    backgroundColor: '#b91c1c',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 12,
  },
  deleteInlineText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#111827',
  },
  textArea: {
    minHeight: 140,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  statusIcon: {
    fontSize: 18,
    fontWeight: '700',
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  errorText: {
    color: '#dc2626',
    fontSize: 13,
    marginBottom: 12,
  },
  saveButton: {
    alignSelf: 'center',
    backgroundColor: '#0f766e',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    minWidth: 180,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  notFound: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 40,
  },
});
