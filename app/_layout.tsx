import 'react-native-get-random-values';
import { Stack, router } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';

import { TasksProvider } from '../context/TasksContext';

export default function RootLayout() {
  return (
    <TasksProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Tasks',
            headerRight: () => (
              <Pressable
                onPress={() => router.push('/tasks/new')}
                style={styles.headerButton}
              >
                <Text style={styles.headerButtonText}>+</Text>
              </Pressable>
            ),
          }}
        />
        <Stack.Screen name="tasks/new" options={{ title: 'Add Task' }} />
        <Stack.Screen name="tasks/[id]" options={{ title: 'Task Details' }} />
      </Stack>
    </TasksProvider>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    backgroundColor: '#0f766e',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 20,
  },
});
