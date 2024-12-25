const express = require("express");
const { upload } = require("../../configs/cloudnary");
const {
  handleUploadImage,
  addProduct,
  editProduct,
  fetchProduct,
  deleteProduct,
} = require("../../controllers/admin-controller/productController");
const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleUploadImage);
router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.get("/get", fetchProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
