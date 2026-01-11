import { v4 as uuidv4 } from 'uuid';
import { Task } from '../models/task';

export const mockTasks: Task[] = [
  {
    id: uuidv4(),
    title: 'Set up project structure',
    description: 'Confirm Expo Router entry and folder layout.',
    status: 'completed',
  },
  {
    id: uuidv4(),
    title: 'Build task list UI',
    description: 'Show title, short description, and status indicator.',
    status: 'pending',
  },
  {
    id: uuidv4(),
    title: 'Add task form',
    description: 'Create a form to add new tasks to the list.',
    status: 'pending',
  },
];
