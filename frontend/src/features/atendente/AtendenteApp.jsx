import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import GuichePage from './pages/GuichePage';
import './styles/atendente.css';

export default function AtendenteApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route
          path="guiche"
          element={
            <ProtectedRoute>
              <GuichePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/atendente/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}
