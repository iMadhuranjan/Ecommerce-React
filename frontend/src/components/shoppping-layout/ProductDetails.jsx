import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { SelectSeparator } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { addtoCartProduct, fetchUserCart } from "@/store/cast-slice/CartSlice";
import { toast } from "@/hooks/use-toast";
import { setProductDetails } from "@/store/user-view/shopProductSlice";
import { useState } from "react";

const ProductDetails = ({ open, setOpen, product }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [showFullDescription, setShowFullDescription] = useState(false);

  function handleAddtoCart(getProductId) {
    dispatch(
      addtoCartProduct({ productId: getProductId, userId: user.id, quantity: 1 })
    ).then(() => {
      dispatch(fetchUserCart({ userId: user.id }));
      toast({ title: "Product Added Successfully" });
    });
  }

  function handleDialogueClose() {
    setOpen(false);
    dispatch(setProductDetails());
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogueClose}>
      <DialogContent className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:p-8 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        {/* Image Section */}
        <div className="relative overflow-hidden rounded-lg max-h-[500px]">
          <img
            src={product?.image}
            alt={product?.title}
            className="aspect-square w-full object-cover"
          />
        </div>

        {/* Details Section */}
        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{product?.title}</h1>
            <p className="text-muted-foreground text-sm leading-relaxed max-h-[100px] overflow-hidden">
              {showFullDescription
                ? product?.description
                : `${product?.description?.slice(0, 150)}...`}
              {product?.description?.length > 150 && (
                <button
                  className="text-blue-500 ml-1 underline"
                  onClick={() => setShowFullDescription((prev) => !prev)}
                >
                  {showFullDescription ? "Show less" : "Read more"}
                </button>
              )}
            </p>
          </div>

          {/* Price Section */}
          <div className="flex items-center justify-between mb-6">
            <p
              className={`text-3xl font-bold ${
                product?.salePrice > 0 ? "line-through text-gray-500" : "text-primary"
              }`}
            >
              ₹ {product?.price}
            </p>
            {product?.salePrice > 0 && (
              <p className="text-2xl font-bold text-green-600">
                ₹ {product?.salePrice}
              </p>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            className="w-full p-3 mb-6"
            onClick={() => handleAddtoCart(product?._id)}
          >
            Add to Cart
          </Button>

          <SelectSeparator />

          {/* Reviews Section */}
          <h2 className="text-xl font-semibold mb-3">Reviews</h2>
          <div className="max-h-[300px] overflow-auto space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex gap-4 items-start">
                <Avatar>
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold">Sangam Mukherjee</p>
                  <div className="flex text-yellow-500">
                    {"★★★★★".split("").map((star, idx) => (
                      <span key={idx}>{star}</span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    This is an awesome product!
                  </p>
                </div>
              </div>
            ))}

            {/* Review Input */}
            <div className="flex items-center gap-4 mt-4">
              <Textarea placeholder="Enter Your Review..." className="flex-1" />
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
