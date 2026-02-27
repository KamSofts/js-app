import { Navigate, Outlet } from 'react-router-dom';

const AllowAccess = ({ user, fetched }) => {
  if (!fetched) return <div>Loading...</div>; // Wait for auth check to finish
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AllowAccess;
