import {
  HomeIcon,
  LogOut,
  LucideFileChartColumnIncreasing,
  MenuIcon,
  ShoppingCart,
  UserRoundCheck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { headerMenuItemsView } from "@/config/FormIndex";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { logoutUser } from "@/store/authSlice";
import { SelectSeparator } from "../ui/select";
import UserCartWrapper from "./UserCartWrapper";
import { useEffect, useState } from "react";
import { fetchUserCart } from "@/store/cast-slice/CartSlice";
import { Label } from "../ui/label";

const ShopingHeader = () => {
  const { isUserLoggedIn, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const navigate = useNavigate();

  function handleLink(getCurrentItem) {
    sessionStorage.removeItem("filters");

    const currentFilters = getCurrentItem?.id !== "home" ? {
      category: [getCurrentItem.id]
    } : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilters));

    navigate(getCurrentItem.path);
  }

  const MenuItem = () => {
    return headerMenuItemsView.map((items) => {
      return (
        <nav
          className="flex flex-col mb-3 text-2xl lg:text-base mt-5 lg:mt-0 lg:mb-0"
          key={items.id}
        >
          <Label
            className="font-bold text-base cursor-pointer"
            onClick={() => handleLink(items)}
          >
            {items.label}
          </Label>
        </nav>
      );
    });
  };

  const dispatch = useDispatch();

  function logoutUserMenu() {
    dispatch(logoutUser());
  }
  useEffect(() => {
    if (isUserLoggedIn && user?.id) {
      dispatch(fetchUserCart({ userId: user.id }));
    }
  }, [dispatch]);

  function HeaderRightCorner() {
    const navigate = useNavigate();

    const [openSheetCart, setOpenSheetCartReal] = useState(false);

   useEffect(()=>{
    if(openSheetCart){
      setOpenSheetCartReal(true);
    }
   },[openSheetCart] )

    return (
      <div className="flex lg:items-center lg:flex-row gap-5">

        <Sheet
          open={openSheetCart}
          onOpenChange={() => setOpenSheetCartReal(false)}
        >
          <Button
            onClick={() => setOpenSheetCartReal(true)}
            className="relative h-10 w-10"
            size="icon"
          >
            <ShoppingCart />
            <span className="sr-only"> User Cart</span>
          </Button>

          <UserCartWrapper
            cartItems={cartItems}
            setOpenSheetCartReal={openSheetCart}
          />
        </Sheet>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="bg-black">
              <AvatarFallback className="bg-black text-white font-extrabold cursor-pointer">
                {user.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56 p-4">
            <DropdownMenuLabel>
              Logged In: <b>{user.username} </b>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigate("/shop/account")}
              className="cursor-pointer"
            >
              <UserRoundCheck className="h-6 w-6 " /> Account
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => logoutUserMenu()}
            >
              <LogOut className="h-6 w-6" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    );
  }

  return (
    <div>
      <header className="sticky w-full top-0 bg-background p-2">
        <div className="flex justify-between items-center  h-16 px-4 md:px-6">
          <Link className="flex gap-4  items-center" to="/shop/home">
            <HomeIcon className="w-9 h-9" />
            <p className="font-bold text-xl">BaklolStore</p>
          </Link>

          <div className="hidden lg:flex gap-5">
            <MenuItem />
          </div>

          <div className="flex gap-9 items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  varient="outline"
                  size="icon"
                  className="lg:hidden flex justify-center items-center"
                >
                  <MenuIcon className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full">
                <MenuItem />
              </SheetContent>
            </Sheet>

            {isUserLoggedIn ? <HeaderRightCorner /> : null}
          </div>
        </div>
        <SelectSeparator />
      </header>
    </div>
  );
};

export default ShopingHeader;
