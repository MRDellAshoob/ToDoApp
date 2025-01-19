import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://frontendtest.ideallco.com/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});


axiosInstance.interceptors.response.use(
  (response) => {
    return response;
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