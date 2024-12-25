/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";

const UserAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  // console.log(location);
  console.log(location.pathname);
  console.log(isAuthenticated);
  
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("login") ||
      location.pathname.includes("register")
    )
  ) {
    return <Navigate to={"/auth/login/"} />;
  }

  if (isAuthenticated && location.pathname.includes("admin")) {
    if (user.role == "user") {
      return <Navigate to="/Unauthorized" />;
    }
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("login") ||
      location.pathname.includes("register"))
  ) {
    if (user.role == "admin") {
      return <Navigate to={"/admin/dashboard"} />;
    } else if (user.role == "user") {
      return <Navigate to={"/shop/home/"} />;
    }
  }

  console.log(
    "Authenticated " + isAuthenticated,
    " Pathname" + location.pathname
  );
  


  return <>{children}</>;
};

export default UserAuth;
