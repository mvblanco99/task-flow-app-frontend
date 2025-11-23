import { Calendar, Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import toast from 'react-hot-toast';
import { type Task, TaskStatus, Priority } from '../types';
import { useAppDispatch } from '../../../store/hooks';
import { deleteTask } from '../store/tasksSlice';
import { cn } from '../../../utils/cn';
import { StatusBadge } from './StatusBadge';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export const TaskCard = ({ task, onEdit }: TaskCardProps) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    if (confirm('¿Estás seguro de eliminar esta tarea?')) {
      dispatch(deleteTask(task._id));
      toast.success('Tarea eliminada');
    }
  };

  const priorityColors = {
    [Priority.Low]: "bg-green-100 text-green-700 border-green-200",
    [Priority.Medium]: "bg-yellow-100 text-yellow-700 border-yellow-200",
    [Priority.High]: "bg-red-100 text-red-700 border-red-200"
  } as const;

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-primary-200 transition-all duration-200 relative overflow-hidden hover:-translate-y-1">
      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border", priorityColors[task.priority])}>
            {task.priority === Priority.High ? 'Alta' : task.priority === Priority.Medium ? 'Media' : 'Baja'}
          </span>
          
          {/* Botones de Acción */}
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button 
              onClick={() => onEdit(task)}
              className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded transition"
              title="Editar"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button 
              onClick={handleDelete}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition"
              title="Eliminar"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Contenido */}
        <h3 className={cn("font-bold text-slate-800 mb-2 text-lg", task.status === TaskStatus.Completed && "line-through text-slate-400")}>
          {task.title}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">
          {task.description}
        </p>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <Calendar className="w-3.5 h-3.5" />
          {task.dueDate ? format(new Date(task.dueDate), 'd MMM', { locale: es }) : 'Sin fecha'}
        </div>
        
        <StatusBadge status={task.status} />
      </div>
    </div>
  );
};