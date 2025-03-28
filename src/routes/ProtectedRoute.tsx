import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const auth = localStorage.getItem('auth');

  const currentRoute = useLocation().pathname;
  if (!auth && currentRoute !== '/login') {
    return <Navigate to="/" replace />;
  }

  if (auth && currentRoute === '/login') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
