import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from '@store';
import { Preloader } from '@ui';
import { getUserState } from '@slices/userSlice/userSlice';

type ProtectedRouteProps = {
  // children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  // children,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const location = useLocation();

  const isAuthChecked = useSelector(getUserState).isAuthChecked;
  const isAuthenticated = useSelector(getUserState).isAuthenticated;

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuthenticated) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  if (isAuthChecked) {
    return <Preloader />;
  }

  return <Outlet />;
};
