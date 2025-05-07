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

export const getRole = () => {
  const token = localStorage.getItem("jwt");

  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.roles[0]?.authority || null; 
  } else {
    return null;
  }
};

export const getUserId = () => {
  const token = localStorage.getItem("jwt");

  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.id; 
  } else {
    return null;
  }
}

export const getEmail = () => {
  const token = localStorage.getItem("jwt");

  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.sub; 
  } else {
    return null;
  }
}