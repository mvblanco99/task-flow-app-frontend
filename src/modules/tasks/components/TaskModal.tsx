import { type Task, TaskStatus, Priority } from '../types';
import Modal from '../../common/components/ui/Modal';
import Input from '../../common/components/ui/Input';
import Button from '../../common/components/ui/Button';
import { useTaskForm } from '../hooks/useTaskForm';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskToEdit?: Task | null;
}

const TaskModal = ({ isOpen, onClose, taskToEdit }: TaskModalProps) => {
  const {
    register,
    onSubmit,
    errors,
    isSubmitting
  } = useTaskForm({ onClose, taskToEdit, isOpen });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={taskToEdit ? 'Editar Tarea' : 'Nueva Tarea'}
    >
      <form onSubmit={onSubmit} className="space-y-5">
        
        <Input
          label="Título"
          placeholder="Ej: Revisar diseño UX"
          error={errors.title?.message}
          {...register('title')}
        />

        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700">Descripción</label>
          <textarea
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary-500 transition-all text-sm resize-none"
            placeholder="Detalles de la tarea..."
            {...register('description')}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            type="date"
            label="Fecha Límite"
            {...register('dueDate')}
          />

          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">Prioridad</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary-500 bg-white text-sm"
              {...register('priority')}
            >
              <option value={Priority.Low}>🟢 Baja</option>
              <option value={Priority.Medium}>🟡 Media</option>
              <option value={Priority.High}>🔴 Alta</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">Estado</label>
            <div className="flex gap-2">
                {Object.values(TaskStatus).map((statusVal) => (
                    <label key={statusVal} className="cursor-pointer flex-1">
                        <input 
                            type="radio" 
                            value={statusVal} 
                            {...register('status')} 
                            className="peer sr-only"
                        />
                        <div className="text-center py-2 rounded-lg border border-gray-200 text-xs font-medium text-gray-500 hover:bg-gray-50 peer-checked:bg-slate-800 peer-checked:text-white peer-checked:border-slate-800 transition capitalize">
                      {statusVal.replace('-', ' ')}
                        </div>
                    </label>
                ))}
            </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-100">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancelar
            </Button>
            <Button type="submit" isLoading={isSubmitting} className="flex-1">
                {taskToEdit ? 'Guardar Cambios' : 'Crear Tarea'}
            </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskModal;