import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const checkTokenExpiration = () => {
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
  }
};

export const getToken = () => {
  console.log("Fetching token from localStorage");
  const token = localStorage.getItem("jwt");
  if (token) {
    return token;
  } else {
    console.error("No token found");
    return null;
  }
}

export const getRole = () => {
  console.log("Retrieving role from token");
  const token = localStorage.getItem("jwt");
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.roles[0]?.authority || null; 
  } else {
    console.error("No token found");
    return null;
  }
};

export const getAccountId = () => {
  console.log("Retrieving AccountID from token");
  const token = localStorage.getItem("jwt");
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.id; 
  } else {
    console.error("No token found");
    return null;
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
    return null;
  }
}