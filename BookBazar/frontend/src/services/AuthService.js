import axios from "axios";
import { LOGIN_API_URL, SIGNUP_API_URL } from "../constants/APIConstants";

// LOGIN USER
export async function loginUser(data) {
  const response = await axios.post(LOGIN_API_URL, data);

  // Backend is returning { token, role, name, email, userId }
  const { token, role, name, email, userId } = response.data;

  // store in localStorage
  localStorage.setItem("authToken", token);
  localStorage.setItem("userRole", role);

  localStorage.setItem("userId", userId);

  return response.data;
}

// SIGNUP USER
export async function signupUser(data) {
  return axios.post(SIGNUP_API_URL, data);
}

// LOGOUT
export function logoutUser() {
  localStorage.clear();
}

// GET ROLE
export function getUserRole() {
  return localStorage.getItem("userRole");
}

// CHECK ADMIN
export function isAdmin() {
  return getUserRole() === "ADMIN";
}

// CHECK LOGIN
export function isLoggedIn() {
  return !!localStorage.getItem("authToken");
}
