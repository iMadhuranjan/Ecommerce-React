import React from "react";
import { Button } from "../ui/button";
import { AlignJustify, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/authSlice";

const AdminHeader = ({setOpen}) => {

  const dispatch=useDispatch();

  function logoutEvent(){
    console.log("Logout")
    dispatch(logoutUser());
  }
  return (
    <div className="flex shadow-lg w-full p-2 border border-red-500">
      <div className="">
      <Button 
      onClick={()=>setOpen(true)}
      className="lg:hidden sm:block" >
        <AlignJustify />
        <span className="sr-only"> Toggle Menu</span>
      </Button>
      </div>
      <div className="flex justify-end flex-1">
        {" "}
        <Button
        onClick={()=>{
          logoutEvent()
        }}
        >
          Logout <LogOut />
        </Button>
      </div>
    </div>
  );
};

export default AdminHeader;
