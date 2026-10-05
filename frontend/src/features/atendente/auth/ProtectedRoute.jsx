import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function ProtectedRoute({ children }) {
  const { sessao } = useAuth();
  if (!sessao) return <Navigate to="/atendente/login" replace />;
  return children;
}
