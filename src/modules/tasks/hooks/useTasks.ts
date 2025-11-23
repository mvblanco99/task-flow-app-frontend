import { useState, useEffect, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { fetchTasks } from '../store/tasksSlice';
import { type Task, TaskStatus } from '../types';

export const useTasks = () => {
  const dispatch = useAppDispatch();
  
  const { user } = useAppSelector((state) => state.auth);
  const { items: tasks, status } = useAppSelector((state) => state.tasks);
  
  // UI State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | TaskStatus>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Fetch tasks on mount
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // Filter Logic
  const filteredTasks = useMemo(() => {
    return (tasks || []).filter((task: Task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [tasks, searchTerm, statusFilter]);

  // Handlers
  const handleCreate = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  return {
    user,
    tasks,
    status,
    filteredTasks,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    isModalOpen,
    editingTask,
    handleCreate,
    handleEdit,
    handleCloseModal
  };
};
