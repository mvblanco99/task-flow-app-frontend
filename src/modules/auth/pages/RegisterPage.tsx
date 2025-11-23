import { Link } from 'react-router-dom';
import { Layers } from 'lucide-react';
import Input from '../../common/components/ui/Input';
import Button from '../../common/components/ui/Button';
import { useRegister } from '../hooks/useRegister';

const RegisterPage = () => {
  const {  errors, isSubmitting, onSubmit,register } = useRegister();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="bg-primary-100 p-4 rounded-full">
            <Layers className="w-8 h-8 text-primary-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">Crear Cuenta</h2>
        <p className="text-center text-slate-500 mb-8">Únete a TaskFlow para gestionar tus tareas</p>
        
        <form onSubmit={onSubmit} className="space-y-6">
          <Input 
            label="Nombre Completo" 
            type="text" 
            placeholder="Juan Pérez" 
            error={errors.name?.message} 
            {...register('name')} 
          />
          <Input 
            label="Email" 
            type="email" 
            placeholder="juan@ejemplo.com" 
            error={errors.email?.message} 
            {...register('email')} 
          />
          <Input 
            label="Contraseña" 
            type="password" 
            placeholder="••••••••" 
            error={errors.password?.message} 
            {...register('password')} 
          />
          
          <Button type="submit" isLoading={isSubmitting}>Registrarse</Button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium hover:underline">
            Inicia Sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
