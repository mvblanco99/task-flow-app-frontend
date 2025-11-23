import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useAppDispatch } from '../../../store/hooks';
import { updateTask, createTask } from '../store/tasksSlice';
import { type Task, TaskStatus, Priority } from '../types';

// Schema definition
const taskSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.enum([Priority.Low, Priority.Medium, Priority.High]),
  status: z.enum([TaskStatus.Pending, TaskStatus.InProgress, TaskStatus.Completed]),
});

export type TaskFormInputs = z.infer<typeof taskSchema>;

interface UseTaskFormProps {
  onClose: () => void;
  taskToEdit?: Task | null;
  isOpen: boolean;
}

export const useTaskForm = ({ onClose, taskToEdit, isOpen }: UseTaskFormProps) => {
  const dispatch = useAppDispatch();

  const form = useForm<TaskFormInputs>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      priority: Priority.Medium,
      status: TaskStatus.Pending
    }
  });

  const { reset, setValue } = form;

  // Effect to populate form when editing
  useEffect(() => {
    if (isOpen) {
      if (taskToEdit) {
        setValue('title', taskToEdit.title);
        setValue('description', taskToEdit.description || '');
        if (taskToEdit.dueDate) {
          setValue('dueDate', taskToEdit.dueDate.split('T')[0]);
        }
        setValue('priority', taskToEdit.priority);
        setValue('status', taskToEdit.status);
      } else {
        reset({
          title: '',
          description: '',
          dueDate: '',
          priority: Priority.Medium,
          status: TaskStatus.Pending
        });
      }
    }
  }, [isOpen, taskToEdit, setValue, reset]);

  const onSubmit = async (data: TaskFormInputs) => {
    try {
      const formattedData = {
        ...data,
        dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : undefined,
      };

      if (taskToEdit) {
        await dispatch(updateTask({ id: taskToEdit._id, data: formattedData })).unwrap();
        toast.success('Tarea actualizada correctamente');
      } else {
        await dispatch(createTask(formattedData)).unwrap();
        toast.success('Tarea creada exitosamente');
      }
      onClose();
    } catch (error: unknown) {
      toast.error(typeof error === 'string' ? error : 'Ocurrió un error al guardar');
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting,
    errors: form.formState.errors,
    register: form.register
  };
};
