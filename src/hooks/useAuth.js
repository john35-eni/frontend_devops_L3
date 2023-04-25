import { AuthContext } from "context/JWTAuthContext";
import { useContext } from "react";

// eslint-disable-next-line import/prefer-default-export
export const useAuth = () => useContext(AuthContext);
