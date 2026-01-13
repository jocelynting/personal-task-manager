import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
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
  const { tasks, updateTask } = useTasks();
  const task = tasks.find((item) => item.id === taskId);
  const [title, setTitle] = useState(task?.title ?? '');
  const [description, setDescription] = useState(task?.description ?? '');
  const [error, setError] = useState('');

  if (!task) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Task Details' }} />
        <Text style={styles.notFound}>Task not found.</Text>
      </View>
    );
  }

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
  }, [task]);

  const statusColor = task.status === 'completed' ? '#16a34a' : '#f59e0b';
  const statusIcon = task.status === 'completed' ? '●' : '○';
  const cardBackground = task.status === 'completed' ? '#ecfdf3' : '#fffbeb';

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: cardBackground }]}>
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Title</Text>
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
          <Text style={styles.sectionLabel}>Description</Text>
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
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#111827',
  },
  textArea: {
    minHeight: 120,
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
