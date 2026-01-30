export const isLoggedIn = () => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("trackly_auth") === "true";
};

export const login = () => {
  localStorage.setItem("trackly_auth", "true");
};

export const logout = () => {
  localStorage.removeItem("trackly_auth");
};
