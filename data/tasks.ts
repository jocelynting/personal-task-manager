import { Task, TaskStatus } from '../models/task';

export const initialTasks: Task[] = [
  {
    id: 'bf6c4f1a-8e8a-4f1f-8fe0-3a0b8b2a4f21',
    title: 'Set up project structure',
    description: 'Confirm Expo Router entry and folder layout.',
    status: TaskStatus.Completed,
  },
  {
    id: 'f140b85c-2f52-4b92-83be-5208fd3b48c7',
    title: 'Build task list UI',
    description: 'Show title, short description, and status indicator.',
    status: TaskStatus.Pending,
  },
  {
    id: '5a6a9d39-7244-4d28-a5e5-d77a1a94c809',
    title: 'Add task form',
    description: 'Create a form to add new tasks to the list.',
    status: TaskStatus.Pending,
  },
];
