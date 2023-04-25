// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";

// eslint-disable-next-line import/prefer-default-export
export const validateToken = (token) => {
  const now = Math.round(new Date().getTime() / 1000);
  const decodedToken = jwt_decode(token);
  const isValid = decodedToken && now < decodedToken.exp;

  return isValid;
};
