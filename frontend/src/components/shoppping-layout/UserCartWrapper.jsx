
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import UserCartContent from "./userCartContent";
const UserCartWrapper = ({cartItems, setOpenSheetCartReal, openSheetCart}) => {
  // console.log(cartItems);
  const totalCartAmount =
  cartItems && cartItems.length > 0
    ? cartItems.reduce(
        (sum, currentItem) =>
          sum +
          (currentItem?.salePrice > 0
            ? currentItem?.salePrice
            : currentItem?.price) *
            currentItem?.quantity,
        0
      )
    : 0;

  function handleCheckout(){
    setOpenSheetCartReal(false); // Close only when the user checks out
  }
  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
       
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>

      <div className="mt-8 space-y-8">
        {
          cartItems && cartItems.length >0 ?
            cartItems.map((item)=>(
              <UserCartContent cartItems={item}
              // setOpenSheetCartReal={setOpenSheetCartReal}
               />
            ))
          : null
        }
      </div>


<Separator className="mt-5"/>
      <div className="mt-8 space-y-8">
        <div className="flex justify-between">
            <span className="font-bold text-xl">
                Total
            </span>

            <span className="font-bold text-xl">
                $ {totalCartAmount}
            </span>
             </div>
      </div>
      <Button className="mt-4" onClick={handleCheckout}> Check out</Button>
    </SheetContent>
  );
};

export default UserCartWrapper;
