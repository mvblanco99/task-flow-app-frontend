import { Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import Button from '../../common/components/ui/Button';

const DashboardPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[80vh] animate-fade-in">
      {/* Logo  */}
      <div className="bg-primary-50 p-8 rounded-3xl mb-8 shadow-sm ring-1 ring-primary-100 animate-bounce-slow">
        <Layers className="w-24 h-24 text-primary-600" />
      </div>

      <h1 className="text-4xl font-bold text-slate-900 mb-3 text-center">
        ¡Bienvenido a TaskFlow, {user?.name.split(' ')[0]}!
      </h1>
      
      <p className="text-slate-500 text-lg max-w-md text-center mb-10 leading-relaxed">
        Tu espacio de trabajo está listo. Comienza a organizar tus proyectos y tareas de manera eficiente hoy mismo.
      </p>

      {/* Acciones */}
      <div className="flex gap-4">
        <Button 
          onClick={() => navigate('/tasks')} 
          className="w-auto px-8 py-3 text-base shadow-lg shadow-primary-500/20"
        >
          Ir a Mis Tareas
        </Button>
      </div>
    </div>
  );
};

export default DashboardPage;