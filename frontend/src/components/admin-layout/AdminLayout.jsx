import { Outlet } from "react-router-dom"
import AdminSiderBar from "./AdminSiderBar"
import AdminHeader from "./AdminHeader"
import { useState } from "react"

const AdminLayout = () => {

  const [openSidear, setOpenSidebar]=useState();
  return (
    <div className=" w-full min-h-full flex">
        {/* Admi SideBar  */}
        <AdminSiderBar open={openSidear} setOpen={setOpenSidebar}/>
        <div className="flex flex-1 flex-col">
            {/* Admin Header  */}
            <AdminHeader setOpen={setOpenSidebar}/>
            <main className="flex  flex-1 bg-muted/40 p-5 m-4 ">
                <Outlet/>
            </main>
        </div>
    </div>
  )
}

export default AdminLayout
