import { useAuth } from "hooks/useAuth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// eslint-disable-next-line import/prefer-default-export, react/function-component-definition
export const PublicRoute = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children } = props;
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (auth.isAuthenticated && auth.user.role === 1) {
      navigate("/", { replace: true, state: { from: location } });
    } else if (auth.isAuthenticated && auth.user.role === 2) {
      navigate("/user", { replace: true, state: { from: location } });
    } else if (auth.isAuthenticated && auth.user.role === 3) {
      navigate("/staff", { replace: true, state: { from: location } });
    } else {
      setIsVerified(true);
    }
  }, [auth.isAuthenticated, location, navigate]);

  if (!isVerified) {
    return null;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};
