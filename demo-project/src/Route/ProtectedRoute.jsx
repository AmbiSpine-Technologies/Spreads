import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from '../layout/loading';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  if (loading) {
    return <Loading />; 
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;



