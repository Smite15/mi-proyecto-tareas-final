import API from "./api";

export const loginUser = async (email, password) => {
  const res = await API.post("/auth/login", { email, password });
  return res.data;
};

export const registerUser = async (name, email, password, role = "user") => {
  const res = await API.post("/auth/register", { name, email, password, role });
  return res.data;
};