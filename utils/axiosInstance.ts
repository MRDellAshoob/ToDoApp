import axios from "axios";

// Create an instance of axios
const axiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.example.com", // Replace with your API URL
  baseURL: "http://frontendtest.ideallco.com/api/", // Replace with your API URL
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
});


axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Unauthorized: Redirect to login.");
      }
    } else if (error.request) {
      console.error("No response from server.");
    } else {
      console.error("Error in request setup:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;