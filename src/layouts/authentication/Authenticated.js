import { useAuth } from "hooks/useAuth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// eslint-disable-next-line import/prefer-default-export, react/function-component-definition
export const Authenticated = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children } = props;
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login", { replace: true, state: { from: location } });
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
