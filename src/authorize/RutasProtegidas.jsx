
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RutasProtegidas(props) {
  const { children, requiredRole } = props;
  const { isAuth, isInitializing, user, hasRole } = useAuth();

  if (isInitializing) {
    return <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">cargando...</span>
              </div>
            </div>;
  }

  if (!isAuth || !user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RutasProtegidas;