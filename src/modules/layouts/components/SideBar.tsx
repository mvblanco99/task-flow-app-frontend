import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard,
  CheckSquare, 
  Layers, 
  LogOut 
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { logout } from '../../auth/store/authSlice';
import { cn } from '../../../utils/cn';

export const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
    { icon: CheckSquare, label: 'Mis Tareas', to: '/tasks' }, 
  ];

  return (
    <aside className="hidden md:flex w-64 flex-col bg-white border-r border-gray-200 h-full flex-shrink-0 transition-all duration-300">
      {/* Brand */}
      <div className="p-6">
        <div className="flex items-center gap-2 text-primary-600 font-bold text-xl">
          <Layers className="w-6 h-6" />
          <span>TaskFlow</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors duration-200",
              isActive 
                ? "bg-primary-50 text-primary-700 shadow-sm ring-1 ring-primary-200" 
                : "text-slate-600 hover:bg-gray-50 hover:text-slate-900"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-primary-700 font-bold text-sm shadow-sm">
            {user?.name.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">
              {user?.name || 'Usuario'}
            </p>
            <p className="text-xs text-slate-500 truncate font-medium">
              {user?.email}
            </p>
          </div>
        </div>
        <button 
          onClick={() => dispatch(logout())}
          className="flex items-center justify-center gap-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 w-full py-2 rounded-lg transition-colors duration-200 border border-transparent hover:border-red-100"
        >
          <LogOut className="w-4 h-4" /> 
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};