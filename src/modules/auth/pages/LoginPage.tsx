import { Link } from 'react-router-dom';
import { Layers } from 'lucide-react';
import Input from '../../common/components/ui/Input';
import Button from '../../common/components/ui/Button';
import { useLogin } from '../hooks/useLogin';

const LoginPage = () => {
  const { errors, isSubmitting, onSubmit,register } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex justify-center mb-6"><div className="bg-primary-100 p-4 rounded-full"><Layers className="w-8 h-8 text-primary-600" /></div></div>
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-8">TaskFlow</h2>
        <form onSubmit={onSubmit} className="space-y-6">
          <Input label="Email" type="email" placeholder="demo@taskflow.com" error={errors.email?.message} {...register('email')} />
          <Input label="Contraseña" type="password" placeholder="password123" error={errors.password?.message} {...register('password')} />
          <Button type="submit" isLoading={isSubmitting}>Iniciar Sesión</Button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium hover:underline">
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;