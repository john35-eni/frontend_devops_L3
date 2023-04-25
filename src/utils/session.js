import axiosInstance from "services/axios";

export const setSession = (accessToken, refreshToken = null) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    // eslint-disable-next-line dot-notation
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    // eslint-disable-next-line dot-notation
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }
};

export const resetSession = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  // eslint-disable-next-line dot-notation
  delete axiosInstance.defaults.headers.common["Authorization"];
};
