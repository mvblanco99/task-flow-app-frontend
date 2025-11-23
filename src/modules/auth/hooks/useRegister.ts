import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppDispatch } from '../../../store/hooks';
import { registerUser } from '../store/authSlice';

const registerSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Ingresa un correo válido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export type RegisterFormInputs = z.infer<typeof registerSchema>;

export const useRegister = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = async (data: RegisterFormInputs) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      toast.success('¡Cuenta creada exitosamente!');
      navigate('/dashboard');
    } catch (error: unknown) {
      const errorMessage = typeof error === 'string' 
        ? error 
        : 'Error al registrarse';
      toast.error(errorMessage);
    }
  };

  return {
    register,
    errors,
    isSubmitting,
    onSubmit: handleSubmit(handleRegister)
  };
};
