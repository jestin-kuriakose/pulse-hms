// src/features/auth/services/authApi.js

import { authApi } from "../../../utils/api";

export const loginUserApi = async (credentials) => {
  return await authApi.post('/auth/login', credentials);
};
