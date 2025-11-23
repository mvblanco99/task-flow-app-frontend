import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppDispatch } from '../../../store/hooks';
import { loginUser } from '../store/authSlice';

const loginSchema = z.object({
  email: z.string().email("Ingresa un correo válido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormInputs) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      toast.success('¡Bienvenido!');
      navigate('/dashboard');
    } catch (error: unknown) {
      const errorMessage = typeof error === 'string' 
        ? error 
        : 'Error al iniciar sesión';
        
      toast.error(errorMessage);
    }
  };

  return {
    register,
    errors,
    isSubmitting,
    onSubmit: handleSubmit(handleLogin)
  };
};
