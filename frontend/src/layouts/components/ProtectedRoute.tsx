import React from 'react';
import type { ReactNode } from 'react';

import { useAppSelector } from '../../hooks/reduxHooks';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode; // phần tử React con
  role?: string; // role là tùy chọn
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const { user } = useAppSelector((state) => state.auth);

  // Nếu chưa đăng nhập hoặc không đúng role
  if (!user || (role && user.role !== role)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>; // Bọc children trong fragment
};

export default ProtectedRoute;
