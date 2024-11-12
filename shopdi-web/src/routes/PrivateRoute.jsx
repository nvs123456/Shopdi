import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { GET, POST } from "../api/GET";
import { useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";
const PrivateRoute = () => {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    console.log("useEffect is called");
    POST(`auth/introspect`,{
      token: localStorage.getItem("Authorization")}).then((res) => {
        console.log(res);
        if(res.code === "OK"){
          auth.setIsAuthenticated(true)
          setIsLoading(false)
        }else {
          auth.setIsAuthenticated(false)
          setIsLoading(false)
        }
      })
  },[])
  console.log(auth.isAuthenticated)
  if(isLoading){
    return <div className="text-center">Loading...</div>
  }
  else {
    if(auth.isAuthenticated){
      return <Outlet />;
    } else {
      return <Navigate to="/login" />;
    }
  }
  
};

export default PrivateRoute;