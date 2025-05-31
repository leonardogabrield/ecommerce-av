import React from 'react';
import { Navigate } from 'react-router-dom';

function RutasProtegidas({ isAuthenticated, children }) {
  if (!isAuthenticated || isAuthenticated === null || isAuthenticated === undefined) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
export default RutasProtegidas;