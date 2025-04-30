import { useAuth } from "../context/AuthContext";

export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {},
  logoutCallback?: () => void
) => {
  const token = localStorage.getItem("token");

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

 
  if (response.status === 401) {
    localStorage.removeItem("token");
    if (logoutCallback) {
      logoutCallback(); 
    }
  }

  return response;
};
