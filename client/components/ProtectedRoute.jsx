import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export const ProtectedRoute = ({ children, roles = [] }) => {
  const [auth, setAuth] = useState({ loading: true, allowed: false });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/me", { withCredentials: true })
      .then((res) => {
        if (roles.length && !roles.includes(res.data.role)) {
          setAuth({ loading: false, allowed: false });
        } else {
          setAuth({ loading: false, allowed: true });
        }
      })
      .catch(() => {
        setAuth({ loading: false, allowed: false });
      });
  }, []);

  if (auth.loading) return <p>Loading...</p>;

  return auth.allowed ? children : <Navigate to="/login" />;
};
