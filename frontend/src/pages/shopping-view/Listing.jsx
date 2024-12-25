import ProductDetails from "@/components/shoppping-layout/ProductDetails";
import ProductFilter from "@/components/shoppping-layout/ProductFilter";
import UserProductTile from "@/components/shoppping-layout/UserProductTile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Toast } from "@/components/ui/toast";
import { sortOptions } from "@/config/FormIndex";
import { useToast } from "@/hooks/use-toast";
import { addtoCartProduct, fetchUserCart } from "@/store/cast-slice/CartSlice";
import {
  fetchAllProductsUser,
  getProductBytId,
} from "@/store/user-view/shopProductSlice";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ArrowDownUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function valueChange(changeValie) {}

const Listing = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.productView);
  const { user } = useSelector((state) => state.auth);
  const { singleProduct } = useSelector((state) => state.productView);
  const [openProductDialogue, setOpenDetailDialogue] = useState(false);
  const [sort, setSort] = useState(null);
  const [filters, setFilters] = useState({});
  const { toast } = useToast();

  function handleSort(value) {
    setSort(value);
  }

  const [searchParam, setSearchParam] = useSearchParams();

  useEffect(() => {
    if (filters !== null || sort !== null)
      dispatch(
        fetchAllProductsUser({ filterProduct: filters, sortByParam: sort })
      );
  }, [dispatch, sort, filters]);

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamString(filters);
      setSearchParam(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    if (singleProduct != null) {
      setOpenDetailDialogue(true);
    }
  }, [singleProduct]);

  function handleAddtoCart(productId) {
    dispatch(
      addtoCartProduct({ productId, userId: user.id, quantity: 1 })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchUserCart({ userId: user?.id })).then((data1) => {
          toast({
            title:"Product Added to Cart"
          });
        });
      }
    });
  }

  function createSearchParamString(filtetContent) {
    const queryParam = [];

    for (const [key, value] of Object.entries(filtetContent)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(",");
        queryParam.push(`${key}=${encodeURIComponent(paramValue)}`);
      }
    }
    return queryParam.join("&");
  }

  function handleFilter(getSectionId, getCurrentOptions) {
    let cpyFilter = { ...filters };
    const indexOfCurrentSectionId =
      Object.keys(cpyFilter).indexOf(getSectionId);
    if (indexOfCurrentSectionId === -1) {
      cpyFilter = {
        ...cpyFilter,
        [getSectionId]: [getCurrentOptions],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilter[getSectionId].indexOf(getCurrentOptions);

      if (indexOfCurrentOption === -1) {
        cpyFilter[getSectionId].push(getCurrentOptions);
      } else {
        cpyFilter[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }
    setFilters(cpyFilter);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilter));
  }

  function handleProductDetail(getCurrentProductId) {
    dispatch(getProductBytId(getCurrentProductId));
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6 bg-background">
      <ProductFilter filters={filters} handleFilter={handleFilter} />

      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="flex p-4 border-b items-center justify-between">
          <h2 className="text-lg font-bold"> All Products</h2>

          <div className="flex items-center gap-5">
            <span className="text-muted-foreground">
              {product.length || 0} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button>
                  <ArrowDownUp /> <span> Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="z-30">
                <DropdownMenuRadioGroup
                  className="w-[200px] border bg-background p-1 cursor-pointer mb-4"
                  value={sort}
                  onValueChange={handleSort}
                >
                  {sortOptions.map((item) => (
                    <DropdownMenuRadioItem
                      key={item.id}
                      value={item.id}
                      className="cursor-pointer"
                    >
                      {item.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Separator />

        <div className=" p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {product && product.length > 0
            ? product.map((item) => (
                <UserProductTile
                  product={item}
                  key={product.id}
                  handleProductDetail={handleProductDetail}
                  handleAddtoCart={handleAddtoCart}
                />
              ))
            : null}
        </div>
      </div>

      <ProductDetails
        open={openProductDialogue}
        setOpen={setOpenDetailDialogue}
        product={singleProduct}
      />
    </div>
  );
};

export default Listing;
