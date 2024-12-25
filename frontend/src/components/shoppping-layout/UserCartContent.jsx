import { Button } from "../ui/button";
import {  Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItems,
  fetchUserCart,
  updaateCart,
} from "@/store/cast-slice/CartSlice";
import { useToast } from "@/hooks/use-toast";

const UserCartContent = ({ cartItems }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

//  useEffect(()=>{
//   setOpenSheetCartReal(true)
//  },[1])

  // function handleDeleteCart(getCartItems) {

  //   dispatch(deleteCartItems({
  //       userId: user.id,
  //       productId: getCartItems?.productId,
  //     })).then(()=>{
        
  //       if (data?.payload?.success) {
  //         toast({
  //           title: "Cart item is deleted successfully",
  //         });
  //       }
  //     })
  //   }

  function handleUpdateCart(cartItems, newQuantity) {
    dispatch(
      updaateCart({
        userId: user.id,
        productId: cartItems.productId,
        quantity:
          newQuantity == "plus"
            ? cartItems.quantity + 1
            : cartItems.quantity - 1,
      })
    ).then(() => {
        toast({
          title: "Cart Is Updated",
        });
        dispatch(fetchUserCart({ userId: user.id }));
      })
      .catch((err) => console.error("Failed to update cart:", err));
  }
  

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItems({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is deleted successfully",
        });
      }
    });
  }

  return (
    <div className="flex items-center space-y-3">
      <img
        src={cartItems?.image}
        alt={cartItems.title}
        className="w-20 h-20 rounded-md"
      />

      <div className="flex-1">
        <h3 className="font-extrabold ml-3 mb-2">{cartItems.title}</h3>

        <div className="flex gap-4">
          <div className="flex items-center mt-1">
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 rounded-full ml-3 "
              onClick={() => handleUpdateCart(cartItems, "minus")}
              disabled={cartItems.quantity == 1}
            >
              <Minus className="h-4 w-4 " />
              <span className="sr-only"> Minus Button</span>
            </Button>
          </div>

          <span className="items-center flex font-semibold mt-1">
            {" "}
            {cartItems.quantity}{" "}
          </span>
          <div className="flex items-center mt-1">
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 rounded-full ml-3 "
              onClick={() => handleUpdateCart(cartItems, "plus")}
            >
              <Plus className="h-4 w-4 " />
              <span className="sr-only"> Minus Button</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <p className="font-medium text-base mb-2">
          ₹{" "}
          {(
            (cartItems.salePrice > 0 ? cartItems.salePrice : cartItems.price) *
            cartItems.quantity
          ).toFixed(2)}
        </p>
        <Trash2
          onClick={() => handleCartItemDelete(cartItems)}
          className="cursor-pointer"
        />
      </div>

    
    </div>
  );
};

export default UserCartContent;
