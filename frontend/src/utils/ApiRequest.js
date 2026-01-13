// src/utils/ApiRequest.js

// Determine base URL based on environment
const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://expense-tracker-app-knl1.onrender.com";

export const registerAPI    = `${BASE_URL}/api/auth/register`;
export const loginAPI       = `${BASE_URL}/api/auth/login`;
export const setAvatarAPI   = `${BASE_URL}/api/auth/setAvatar`;
export const addTransaction = `${BASE_URL}/api/v1/addTransaction`;
export const getTransactions= `${BASE_URL}/api/v1/getTransaction`;
export const editTransactions   = `${BASE_URL}/api/v1/updateTransaction`;
export const deleteTransactions = `${BASE_URL}/api/v1/deleteTransaction`;
