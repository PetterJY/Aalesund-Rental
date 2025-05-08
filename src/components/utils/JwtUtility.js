import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const checkTokenExpiration = () => {
  console.log("Checking token expiration");
  const token = localStorage.getItem("jwt");
  if (token) {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    
    if (decodedToken.exp < currentTime) {
      console.log("Token has expired");
      localStorage.removeItem("jwt"); // Remove the expired token
    } else {
      console.log("Token is valid");
    }
  } else {
    console.log("No token found");
    throw new Error("No token found in localStorage");
  }
};

export const getToken = () => {
  console.log("Fetching token from localStorage");
  const token = localStorage.getItem("jwt");
  if (token) {
    return token;
  } else {
    console.error("No token found");
    throw new Error("No token found in localStorage");
  }
}

export const getRole = () => {
  console.log("Retrieving role from token");
  const token = localStorage.getItem("jwt");
  if (!token || token === "undefined") {
    console.error("No JWT token found");
    throw new Error("No JWT token found");
  }
  const decodedToken = jwtDecode(token);
  return decodedToken.roles[0]?.authority || null; 
};

export const getAccountId = () => {
  console.log("Retrieving AccountID from token");
  const token = localStorage.getItem("jwt");
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.id; 
  } else {
    console.error("No token found");
    throw new Error("No token found in localStorage");
  }
}

export const getEmail = () => {
  console.log("Retrieving email from token");
  const token = localStorage.getItem("jwt");

  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.sub; 
  } else {
    console.error("No token found");
    throw new Error("No token found in localStorage");
  }
}