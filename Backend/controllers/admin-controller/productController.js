const { imageUploadUtil } = require("../../configs/cloudnary");
const Product = require("../../models/Product");

const handleUploadImage = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Error Occured",
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStoock,
    } = req.body;

    const newProduct = new Product({
      image,
      title,
      brand,
      description,
      category,
      price,
      salePrice,
      totalStoock,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      data: newProduct,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Error Occured",
    });
  }
};

const fetchProduct = async (req, res) => {
  try {
    const listOfProduct = await Product.find({});

    res.status(201).json({
      success: true,
      message: "Product Fetched Successfully",
      data: listOfProduct,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Error Occured",
    });
  }
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      price,
      brand,
      salePrice,
      totalStoock,
    } = req.body;
    const findProduct = await Product.findById(id);

    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "product Not Found",
      });
    }

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.brand = brand || findProduct.brand;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStoock = totalStoock || findProduct.totalStoock;

    await findProduct.save();

    res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      data: findProduct,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: err,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const Products = await Product.findByIdAndDelete(id);
    if (!Products) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Error Occured",
    });
  }
};
module.exports = {
  handleUploadImage,
  addProduct,
  editProduct,
  fetchProduct,
  deleteProduct,
};
