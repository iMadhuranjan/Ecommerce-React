import { Outlet } from "react-router-dom";
import ShopingHeader from "./ShopingHeader";

const ShopLayout = () => {
  return (
    <div className="flex flex-col bg-yellow-200 overflow-hidden">
      {/* Common Header  */}
      <ShopingHeader />
      <main className=" flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default ShopLayout;
