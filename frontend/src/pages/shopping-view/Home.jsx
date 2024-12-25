import React, { useEffect, useState } from "react";
import banner1 from "../../../public/Banner1.webp";
import banner2 from "../../../public/Banner2.webp";
import banner3 from "../../../public/Banner3.webp";
import { Button } from "@/components/ui/button";
import {
  Baby,
  ChevronLeft,
  ChevronRight,
  Footprints,
  MoveLeftIcon,
  Shirt,
  Tag,
  Watch,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProductsUser,
  getProductBytId,
} from "@/store/user-view/shopProductSlice";
import UserProductTile from "@/components/shoppping-layout/UserProductTile";
import nike from "../../../public/Brands/nike.svg";
import adidas from "../../../public/Brands/adidas.svg";
import puma from "../../../public/Brands/puma.svg";
import hnm from "../../../public/Brands/hnm.svg";
import levis from "../../../public/Brands/levis.svg";
import zara from "../../../public/Brands/zara.svg";
import { useNavigate } from "react-router-dom";
import { addtoCartProduct, fetchUserCart } from "@/store/cast-slice/CartSlice";
import { useToast } from "@/hooks/use-toast";
import ProductDetails from "@/components/shoppping-layout/ProductDetails";

const Home = () => {
  const banners = [banner1, banner2, banner3];
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const { product, singleProduct } = useSelector((state) => state.productView);
  const { user } = useSelector((state) => state.auth);
  // const {singleProduct}=useSelector((state)=>state.auth);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [openProductDialogue, setOpenDetailDialogue] = useState(false);

  const categoryCategory = [
    { id: "men", label: "Men", icon: Shirt },
    { id: "women", label: "Women", icon: Tag },
    { id: "kids", label: "Kids", icon: Baby },
    { id: "accessories", label: "Accessories", icon: Watch },
    { id: "footwear", label: "Footwear", icon: Footprints },
  ];

  const brandCategory = [
    { id: "nike", label: "Nike", icon: nike },
    { id: "adidas", label: "Adidas", icon: adidas },
    { id: "puma", label: "Puma", icon: puma },
    { id: "levi", label: "Levi's", icon: levis },
    { id: "zara", label: "Zara", icon: zara },
    { id: "h&m", label: "H&M", icon: hnm },
  ];

  useEffect(() => {
    dispatch(
      fetchAllProductsUser({
        filterProduct: {},
        sortByParam: "price-lowtohigh",
      })
    );
  }, []);

  function handleLinkNavigation(getCurrentItem, section) {
    sessionStorage.removeItem("filters");

    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/listing");
  }

  function handleAddtoCart(productId) {
    dispatch(
      addtoCartProduct({ productId, userId: user.id, quantity: 1 })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchUserCart({ userId: user?.id })).then((data1) => {
          toast({
            title: "Product Added to Cart",
          });
        });
      }
    });
  }

  function handleProductDetail(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(getProductBytId(getCurrentProductId));
  }

  useEffect(() => {
    if (singleProduct != null) {
      setOpenDetailDialogue(true);
    }
  }, [singleProduct]);
  return (
    <>
      <div className="flex flex-col min-h-screen bg-background">
        <div className="flex w-full h-[500px] overflow-hidden relative">
          {banners.map((items, index) => (
            <img
              src={items}
              key={index}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          {
            // console.log(product)
          }
          <Button
            className="absolute top-1/2 left-4 bg-black/50 hover:bg-white/5"
            onClick={() => {
              setCurrentSlide(
                (prevSlide) => (prevSlide - 1 + banners.length) % banners.length
              );
            }}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            className="absolute top-1/2 right-4 bg-black/50 hover:bg-white/5"
            onClick={() => {
              setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length);
            }}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <section className="py-10 bg-gray-200">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-semibold text-center mb-5">
              {" "}
              Shop By Category
            </h3>
            <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {categoryCategory.map((item) => (
                <Card
                  onClick={() => handleLinkNavigation(item, "category")}
                  className="cursor-pointer hover:shadow-lg"
                >
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <item.icon className="w-12 h-12  mb-4 text-primary" />
                    <span> {item.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="p-12">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-semibold text-center mb-5">
              Featured Products
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {product && product.length > 0
                ? product.map((item) => (
                    <UserProductTile
                      product={item}
                      handleAddtoCart={handleAddtoCart}
                      handleProductDetail={handleProductDetail}
                    />
                  ))
                : null}
              {}
            </div>
          </div>
        </section>

        <section className="py-10 bg-gray-200">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-semibold text-center mb-5">
              {" "}
              Shop By Category
            </h3>
            <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {brandCategory.map((item) => (
                <Card
                  className="cursor-pointer hover:shadow-lg"
                  onClick={() => handleLinkNavigation(item, "brand")}
                >
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <img src={item.icon} width={60} />
                    <span> {item.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <ProductDetails
          open={openProductDialogue}
          setOpen={setOpenDetailDialogue}
          product={singleProduct}
        />
      </div>
    </>
  );
};

export default Home;
