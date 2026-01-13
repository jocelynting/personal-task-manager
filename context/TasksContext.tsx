import { createContext, useContext, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { initialTasks } from '../data/tasks';
import { Task } from '../models/task';

interface TaskInput {
  title: string;
  description: string;
}

interface TaskUpdate {
  title?: string;
  description?: string;
}

interface TasksContextValue {
  tasks: Task[];
  addTask: (input: TaskInput) => void;
  updateTask: (taskId: string, updates: TaskUpdate) => void;
  deleteTask: (taskId: string) => void;
  toggleTaskStatus: (taskId: string) => void;
}

const TasksContext = createContext<TasksContextValue | undefined>(undefined);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (input: TaskInput) => {
    const title = input.title.trim();
    const description = input.description.trim();

    if (!title) {
      // Prevent empty titles to keep list items meaningful.
      return;
    }

    setTasks((prevTasks) => [
      {
        id: uuidv4(),
        title,
        description,
        status: 'pending',
      },
      ...prevTasks,
    ]);
  };

  const updateTask = (taskId: string, updates: TaskUpdate) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, ...updates } : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === 'completed' ? 'pending' : 'completed',
            }
          : task
      )
    );
  };

  const value = useMemo(
    () => ({ tasks, addTask, updateTask, deleteTask, toggleTaskStatus }),
    [tasks]
  );

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider');
  }

  return context;
}
