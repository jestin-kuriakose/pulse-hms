import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const withRoleAuthorization = (allowedRoles) => (WrappedComponent) => {
  return (props) => {
    const { user } = useSelector((state) => state.auth);

    if (!user || !allowedRoles.includes(user.role)) {
      return <Navigate to="/unauthorized" replace />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withRoleAuthorization;
