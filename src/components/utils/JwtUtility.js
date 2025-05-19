import { jwtDecode } from "jwt-decode";

export const tokenIsValid = () => {
  console.log("Checking if user is logged in");
  const token = localStorage.getItem("accessToken");
  if (!token) {
    console.warn("Token not found in localStorage");
    return false; 
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    if (decodedToken.exp < currentTime) {
      console.log("Token has expired");
      localStorage.removeItem("accessToken");
      return false;
    }
    console.log("Valid Token");
    return true;
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
};

export const checkTokenExpiration = () => {
  console.log("Checking token expiration");
  const token = localStorage.getItem("accessToken");
  if (token) {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    
    if (decodedToken.exp < currentTime) {
      console.log("Token has expired");
      localStorage.removeItem("accessToken"); 
    } else {
      console.log("Valid Token");
    }
  } else {
    console.warn("Token not found in localStorage");
    return false; 
  }
};

export const getToken = () => {
  console.log("Fetching token from localStorage");
  const token = localStorage.getItem("accessToken");
  if (token) {
    return token;
  } else {
    console.warn("Token not found in localStorage");
    return null; 
  }
}

export const getRole = () => {
  console.log("Retrieving role from token");
  const token = localStorage.getItem("accessToken");
  if (!token || token === "undefined") {
    console.warn("Token not found in localStorage or is undefined");
    return null;
  }
  const decodedToken = jwtDecode(token);
  return decodedToken.roles[0]?.authority || null; 
};

export const getAccountId = () => {
  console.log("Retrieving AccountID from token");
  const token = localStorage.getItem("accessToken");
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.id; 
  } else {
    console.warn("Token not found in localStorage");
    return null; 
  }
}

export const getEmail = () => {
  console.log("Retrieving email from token");
  const token = localStorage.getItem("accessToken");

  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.sub; 
  } else {
    console.warn("Token not found in localStorage");
    return null;
  }
}