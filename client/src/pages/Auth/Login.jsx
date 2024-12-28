import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";
import LoginForm from "../../features/auth/components/LoginForm";
import LoginLayout from "../../components/layouts/LoginLayout";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, isAuthenticated, status } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && status === 'succeeded') {
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, status, navigate, location]);

  const handleLogin = async (credentials) => {
    try {
      await dispatch(loginUser(credentials)).unwrap();
    } catch (err) {
      console.error("Failed to log in:", err);
    }
  };

  return (
    <LoginLayout>
      <LoginForm onSubmit={handleLogin} isLoading={status === 'loading'} />
    </LoginLayout>
  );
};

export default Login;
