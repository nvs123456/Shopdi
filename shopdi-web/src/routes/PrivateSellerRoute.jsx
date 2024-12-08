import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useState, useEffect } from "react";
import { POST } from "../api/GET";
import { useAuth } from "./AuthProvider";
const PrivateSellerRoute = () => {

  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    POST(`auth/introspect`, {
      token: localStorage.getItem("Authorization")
    }).then((res) => {
      if (res.code === "OK") {
        auth.setIsAuthenticated(true)
        setIsLoading(false)
      } else {
        auth.setIsAuthenticated(false)
        setIsLoading(false)
      }
    })
  }, [])
  if (isLoading) {
    return <div className="text-center">Loading...</div>
  }
  else {
    if (auth.isAuthenticated) {
      let roles = JSON.parse(localStorage.getItem("roles"));
      if (!roles.find(role => role.name === "SELLER")) {
        return <Navigate to="seller/signup" />;
      }
      return <Outlet />;
    } else {
      return <Navigate to="/login" />;
    }
  }
};

export default PrivateSellerRoute;