import { cn } from '../../../utils/cn';
import { TaskStatus } from '../types';

interface StatusBadgeProps {
  status: (typeof TaskStatus)[keyof typeof TaskStatus];
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  // Configuración de estilos por estado
  const styles = {
    [TaskStatus.Pending]: "bg-slate-100 text-slate-600 border-slate-200",
    [TaskStatus.InProgress]: "bg-blue-50 text-blue-600 border-blue-200",
    [TaskStatus.Completed]: "bg-green-50 text-green-600 border-green-200",
  } as const;

  // Etiquetas legibles
  const labels = {
    [TaskStatus.Pending]: "Pendiente",
    [TaskStatus.InProgress]: "En Progreso",
    [TaskStatus.Completed]: "Completada",
  } as const;

  // Colores del punto indicador (dot)
  const dotStyles = {
    [TaskStatus.Pending]: "bg-slate-400",
    [TaskStatus.InProgress]: "bg-blue-500 animate-pulse",
    [TaskStatus.Completed]: "bg-green-500",
  } as const;

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border",
      styles[status],
      className
    )}>
      <span className={cn("w-1.5 h-1.5 rounded-full", dotStyles[status])}></span>
      {labels[status]}
    </span>
  );
};