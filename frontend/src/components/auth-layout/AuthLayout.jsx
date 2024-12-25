import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex flex-col md:flex-row w-full h-full">
  {/* Left Section */}
  <div className="w-full bg-red-600 p-6 flex justify-center items-center">
    <h1 className="text-3xl font-extrabold  text-white ">
      Welcome to E-commerce Shopping
    </h1>
  </div>

  {/* Right Section */}
  <div className="w-full  p-6 flex items-center justify-center bg-gray-100 h-97">
    <Outlet />
  </div>
</div>


  );
};

export default AuthLayout;
