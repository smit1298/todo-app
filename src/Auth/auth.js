import jwt from "jsonwebtoken";

const secretKey = "test1234"; 

export const generateToken = (username) => {
  return jwt.sign({ username }, secretKey, { expiresIn: "1h" });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (e) {
    return null;
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;
  const decoded = verifyToken(token);
  return !!decoded;
};

export const logout = () => {
  localStorage.removeItem("token");
};
