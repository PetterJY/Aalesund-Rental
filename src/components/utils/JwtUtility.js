import { jwtDecode } from "jwt-decode";

export const tokenIsValid = () => {
  const token = localStorage.getItem("accessToken");
  
  if (!token) {
    console.warn("Token not found in localStorage");
    return false; 
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("accessToken");
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const isTokenExpired = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    console.warn("Token not found in localStorage");
    return true; // No token means effectively "expired"
  }
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    const buffer = 30; // 30-second buffer for proactive refresh
    if (decodedToken.exp < currentTime + buffer) {
      localStorage.removeItem("accessToken");
      return true;
    }
    return false;
  } catch (error) {
    localStorage.removeItem("accessToken");
    return true;
  }
};

export const getToken = () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    return token;
  } else {
    console.warn("Token not found in localStorage");
    return null; 
  }
}

export const getRefreshToken = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (refreshToken) {
    return refreshToken;
  } else {
    console.warn("Refresh token not found in localStorage");
    return null;
  }
};

export const getRole = () => {
  const token = localStorage.getItem("accessToken");
  if (!token || token === "undefined") {
    console.warn("Token not found in localStorage or is undefined");
    return null;
  }
  const decodedToken = jwtDecode(token);
  return decodedToken.roles[0]?.authority || null; 
};

export const getAccountId = () => {
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
  const token = localStorage.getItem("accessToken");

  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.sub; 
  } else {
    console.warn("Token not found in localStorage");
    return null;
  }
}

export const makeApiRequest = async (url, options = {}) => {
  let accessToken = getToken();

  if (isTokenExpired()) {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      console.warn("No refresh token available");
      throw new Error("No refresh token available");
    }

    try {
      const response = await fetch("https://norwegian-rental.online/api/auth/refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error(`Refresh token request failed with status ${response.status}`);
      }

      const data = await response.json();
      accessToken = data.accessToken;
      localStorage.setItem("accessToken", accessToken);
    } catch (error) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      throw error;
    }
  }

  // Ensure headers object exists
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json", // Ensure JSON content type for consistency
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      if (response.status === 401 && response.headers.get("x-token-error") === "expired") {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          console.warn("No refresh token available");
          throw new Error("No refresh token available");
        }

        try {
          const refreshResponse = await fetch("https://norwegian-rental.online/api/auth/refresh-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken }),
          });

          if (!refreshResponse.ok) {
            throw new Error(`Refresh token request failed with status ${refreshResponse.status}`);
          }

          const data = await refreshResponse.json();
          accessToken = data.accessToken;
          localStorage.setItem("accessToken", accessToken);

          // Retry the original request
          options.headers.Authorization = `Bearer ${accessToken}`;
          const retryResponse = await fetch(url, options);
          if (!retryResponse.ok) {
            throw new Error(`Request failed with status ${retryResponse.status}`);
          }
          return retryResponse.status === 204 ? {} : await retryResponse.json();
        } catch (refreshError) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          throw refreshError;
        }
      }
      throw new Error(`Request failed with status ${response.status}`);
    }
    return response.status === 204 ? {} : await response.json();
  } catch (error) {
    throw error;
  }
};