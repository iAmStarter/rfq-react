// src/components/ProtectedRoute.tsx
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import type { RootState } from '../../store';
import { logout } from '../../store/authSlice';
interface ProtectedRouteProps {
  redirectPath?: string;
}
const ProtectedRoute = ({ redirectPath = '/login' }: ProtectedRouteProps) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
      const dispatch = useDispatch();

  if (!isAuthenticated) {
     dispatch(logout());
    return <Navigate to={redirectPath} replace />;
  }
  
  return <Outlet />;

};
export default ProtectedRoute;