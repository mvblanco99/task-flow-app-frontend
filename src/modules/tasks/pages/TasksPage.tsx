import { 
  Plus, Search, Filter
} from 'lucide-react';
import { TaskCard } from '../components/TaskCard';
import { TaskStatus } from '../types';
import TaskModal from '../components/TaskModal';
import Button from '../../common/components/ui/Button';
import { useTasks } from '../hooks/useTasks';

const TasksPage = () => {
  const {
    user,
    status,
    tasks,
    filteredTasks,
    searchTerm,
    statusFilter,
    isModalOpen,
    editingTask,
    setStatusFilter,
    setSearchTerm,
    handleCreate,
    handleEdit,
    handleCloseModal
  } = useTasks();

  if (status === 'loading' && tasks.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-slate-400 animate-pulse">
        Cargando tus tareas...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Hola, {user?.name.split(' ')[0] || 'User'} 👋
          </h1>
          <p className="text-slate-500 mt-1">
            Aquí tienes el resumen de tus proyectos.
          </p>
        </div>
        
        <Button onClick={handleCreate} className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-200/50">
          <Plus className="w-5 h-5" /> 
          <span className="sm:hidden md:inline ml-2">Nueva Tarea</span>
        </Button>
      </header>

      {/* Toolbar de Filtros */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Buscador */}
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Buscar tarea por título..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm"
          />
        </div>

        {/* Filtro de Estado y Acciones Extra */}
        <div className="flex gap-3">
            <div className="relative min-w-[160px]">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as 'all' | TaskStatus)}
                    className="w-full appearance-none pl-10 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm text-slate-600 cursor-pointer hover:border-gray-300"
                >
                    <option value="all">Todos los estados</option>
                    <option value="pending">Pendientes</option>
                    <option value="in-progress">En Progreso</option>
                    <option value="completed">Completadas</option>
                </select>
                {/* Pequeño triangulo custom para el select si se quisiera, por ahora usaremos el nativo pero sin estilo default */}
            </div>
        </div>
      </div>

      {/* Grid de Tareas */}
      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTasks.map(task => (
            <TaskCard key={task._id} task={task} onEdit={handleEdit} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 bg-white border-2 border-dashed border-gray-200 rounded-2xl">
          <div className="bg-gray-50 p-4 rounded-full mb-3">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900">No se encontraron tareas</h3>
          <p className="text-slate-500 mb-6">Prueba ajustando los filtros o crea una nueva tarea.</p>
          <Button onClick={handleCreate} variant="outline" className="w-auto">
            Crear Tarea
          </Button>
        </div>
      )}

      <TaskModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        taskToEdit={editingTask} 
      />
    </div>
  );
};

export default TasksPage;