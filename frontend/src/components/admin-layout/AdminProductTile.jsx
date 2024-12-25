
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

const adminProductTile = ({
  product,
  setProductId,
  setOpenSheetForAddProdduct,
  setFormData,
  deleteProductById
}) => {
  return (
    <Card className="bg-white shadow-lg hover:shadow-xl rounded-lg transition-shadow duration-300 transform hover:-translate-y-1">
      <div className="overflow-hidden rounded-t-lg">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-5">
        <h1 className="font-bold text-2xl text-center mb-3 text-gray-800">
          {product.title}
        </h1>
        <div className="flex justify-between p-3 text-gray-600">
          <span className="font-bold">{product.category}</span>
          <span>{product.brand}</span>
        </div>
        <div className="flex gap-2 justify-between items-center mt-3">
          <span
            className={`${
              product.salePrice > 0
                ? "line-through text-gray-500"
                : "text-lg font-semibold text-primary"
            }`}
          >
            ₹ {product.price}
          </span>
          {product.salePrice > 0 && (
            <span className="text-lg font-bold text-green-500">
              ₹ {product.salePrice}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-5 p-5 bg-gray-100 rounded-b-lg">
        <Button
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-300"
          onClick={() => {
            setProductId(product._id);
            setOpenSheetForAddProdduct(true);
            setFormData(product);
          }}
        >
          Edit
        </Button>
        <Button
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg transition-all duration-300"
          onClick={() => {
            deleteProductById(product._id);
          }}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default adminProductTile;
