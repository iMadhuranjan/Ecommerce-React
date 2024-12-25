import { CommonForm } from "@/common/Form";
import ProductImageUpload from "@/components/admin-layout/AdminUploadmage";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config/FormIndex";
import { toast } from "@/hooks/use-toast";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/Admin-Slice/AdminProductSlice";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminProductTile from "@/components/admin-layout/adminProductTile";

const Products = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const initialData = {
    image: "",
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
  };

  const { productList } = useSelector((state) => state.adminProducts);

  const [productId, setProductId] = useState();

  const disptatch = useDispatch();

  const [formData, setFormData] = useState(initialData);

  const onSubmit = (event) => {
    event.preventDefault();

    productId != null
      ? disptatch(editProduct({ id: productId, formData })).then((data) => {
          if (data.payload.success) {
            disptatch(fetchAllProducts());
            setFormData(initialData);
            setOpenSheetForAddProdduct(false);
          }
        })
      : disptatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          if (data.payload.success) {
            setImageFile(null);
            setFormData(initialData);
            disptatch(fetchAllProducts());
            toast({
              title: "Product Added Successfully",
            });
            setOpenSheetForAddProdduct(false);
          }
        });
  };

  function deleteProductById(deleteProductID) {
    disptatch(deleteProduct({id:deleteProductID})).then((data)=>{
      if(data?.payload?.success) disptatch(fetchAllProducts());
    })

  }
  useEffect(() => {
    disptatch(fetchAllProducts());
  }, []);

  const [openSheetforAddProduct, setOpenSheetForAddProdduct] = useState(false);
  return (
    <>
      <div className="flex flex-col w-full justify-start">
        <div className="m-4">
          <Button onClick={() => setOpenSheetForAddProdduct(true)}>
            Add New Product
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {productList.data && productList.data.length > 0
            ? productList.data.map((prodItems, i) => {
                return (
                  <AdminProductTile
                    key={i}
                    product={prodItems}
                    setProductId={setProductId}
                    setOpenSheetForAddProdduct={setOpenSheetForAddProdduct}
                    setFormData={setFormData}
                    deleteProductById={deleteProductById}
                  />
                );
              })
            :  null }
        </div>

        <Sheet
          open={openSheetforAddProduct}
          onOpenChange={() => {
            setOpenSheetForAddProdduct(false);
            setProductId(null);
            setFormData(initialData);
          }}
        >
          <SheetContent className="overflow-scroll">
            <SheetHeader>
              <SheetTitle className=" flex gap-3 border-b py-5">
                <CirclePlus />
                {productId != null ? "Edit Product " : "Add New Product"}
              </SheetTitle>
            </SheetHeader>
            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              isEditMode={productId != null}
            />
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              buttonText={productId != null ? "Save Product" : "Add Product"}
              // isFormValid={!isFormValid()}
            />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Products;
