export const TaskStatus = {
  Pending: 'pending',
  InProgress: 'in-progress',
  Completed: 'completed',
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

export const Priority = {
  Low: 'low',
  Medium: 'medium',
  High: 'high',
} as const;

export type Priority = (typeof Priority)[keyof typeof Priority];

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  dueDate?: string;
  createdAt: string;
}

export type CreateTaskDto = Omit<Task, '_id' | 'createdAt' | 'updatedAt' | 'userId'>;
export type UpdateTaskDto = Partial<CreateTaskDto>;
