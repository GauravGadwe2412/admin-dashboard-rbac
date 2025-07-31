import { jwtDecode } from "jwt-decode";
import { getToken, clearToken } from "../store/auth";

export const useAuth = () => {
  const token = getToken();

  if (!token) return { isAuthenticated: false, user: null };

  try {
    const decoded = jwtDecode(token);
    const expired = decoded.exp * 1000 < Date.now();

    if (expired) {
      clearToken();
      return { isAuthenticated: false, user: null };
    }

    return {
      isAuthenticated: true,
      user: decoded,
    };
  } catch {
    clearToken();
    return { isAuthenticated: false, user: null };
  }
};
