import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/routes/AuthProvider";
import { useCookies } from 'react-cookie';
const PrivateRoute = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['Authorization']);
  // const user = useAuth();
  // console.log(user);
  if ( !cookies.Authorization) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;