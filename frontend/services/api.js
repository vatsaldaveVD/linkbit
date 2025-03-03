import axios from "axios";
import axiosInstance from "./axiosConfig";

const API_URL = "http://localhost:5050"; // Your backend API URL

// Sign Up
export const signUp = async (userData) => {
  try {
    const response = await axiosInstance.post("/signup", userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Sign In
export const signIn = async (userData) => {
  try {
    const response = await axiosInstance.post("/login", userData);

    // Store the user data in localStorage
    localStorage.setItem("userData", response.data);

    // Store the access token in localStorage
    const { accessToken } = response.data;
    localStorage.setItem("accessToken", accessToken);

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Unique Slug
export const getUniqueSlug = async () => {
  try {
    const response = await axiosInstance.get("/shortId");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
