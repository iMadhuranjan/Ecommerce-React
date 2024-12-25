import {
  LayoutDashboard,
  PackageCheck,
  ShieldCheck,
  Store,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const sideBarMenu = [
  {
    id: "dashboard",
    name: "Dashboard",
    link: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    name: "Products",
    link: "/admin/products",
    icon: <Store />,
  },
  {
    id: "order",
    name: "Orders",
    link: "/admin/orders",
    icon: <PackageCheck />,
  },
  {
    id: "user",
    name: "User View",
    link: "/shop/home",
    icon: <User />,
  }
];

const MenuIcons = ({ setOpen }) => {
  const navigate = useNavigate();
  return (
    <nav className="flex flex-col gap-2">
      {sideBarMenu.map((items) => (
        <div
          key={items.id}
          className="p-2 flex gap-4 pl-5 cursor-pointer hover:bg-muted hover:font-bold items-center"
          onClick={() => {
            navigate(items.link)
            setOpen? setOpen(false) : null;
          }}
        >
          {items.icon}
          <h2>{items.name}</h2>
        </div>
      ))}
    </nav>
  );
};

const AdminSiderBar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="h-full flex flex-col">
            <SheetHeader className="border-b mb-5">
              <SheetTitle className="flex  pt-5 pb-5 gap-3">
                <ShieldCheck />
                <h1 className="text-xl font-bold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuIcons setOpen={setOpen}/>
          </div>
        </SheetContent>
      </Sheet>

      <aside className="hidden lg:flex w-64 bg-background flex-col">
        <div
          className="p-4 flex cursor-pointer gap-2 items-center mt-10"
          onClick={() => {
            navigate("/admin/dashboard");
          }}
        >
          <ShieldCheck />
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>

        <MenuIcons />
      </aside>
    </>
  );
};

export default AdminSiderBar;
