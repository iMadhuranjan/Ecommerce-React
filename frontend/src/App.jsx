import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthLayout from "./components/auth-layout/AuthLayout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AdminLayout from "./components/admin-layout/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import Products from "./pages/Admin/Products";
import Orders from "./pages/Admin/Orders";
import Feature from "./pages/Admin/Feature";
import ShopLayout from "./components/shoppping-layout/ShopLayout";
import NotFound from "./components/not-found/NotFound";
import Home from "./pages/shopping-view/Home";
import Listing from "./pages/shopping-view/listing";
import UserAccount from "./pages/shopping-view/UserAccount";
import CheckOut from "./pages/shopping-view/CheckOut";
import UserAuth from "./common/UserAuth";
import Unauthorized from "./components/not-found/Unauthorized";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/authSlice";

function App() {
  const { isUserLoggedIn, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // console.log(isLoading + "IsLoading");

  
  if (isLoading) {
    return <div> Loading.....</div>;
  }

  console.log;
  return (
    <div className="flex flex-col overflow-hidden w-full">
      {/* <h1> Heading </h1> */}
      <Routes>
        <Route
          path="/auth"
          element={
            <UserAuth isAuthenticated={isUserLoggedIn} user={user}>
              <AuthLayout />
            </UserAuth>
          }
        >
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
        </Route>

        <Ro
        ute
          path="/admin"
          element={
            <UserAuth isAuthenticated={isUserLoggedIn} user={user}>
              <AdminLayout />
            </UserAuth>
          }
        >
          <Route
            path="dashboard"
            element={
              <UserAuth isAuthenticated={isUserLoggedIn} user={user}>
                <Dashboard />
              </UserAuth>
            }
          />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="features" element={<Feature />} />
        </Route>

        <Route
          path="/shop"
          element={
            <UserAuth isAuthenticated={isUserLoggedIn} user={user}>
              <ShopLayout />
            </UserAuth>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="listing" element={<Listing />} />
          <Route path="account" element={<UserAccount />} />
          <Route path="checkout" element={<CheckOut />} />
        </Route>

        <Route path="*" element={<NotFound />}></Route>
        <Route path="/Unauthorized" element={<Unauthorized />}></Route>
      </Routes>
    </div>
  );
}

export default App;
