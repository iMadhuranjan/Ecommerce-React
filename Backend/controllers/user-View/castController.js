const Cart = require("../../models/Cart");
const product = require("../../models/Product");

// const addTocart = async (req, res) => {
//   try {
//     const { userId, productId, quantity } = req.body;

//     console.log("Request Body:", req.body);

//     if (!userId || !productId || quantity <= 0) {
//       return res.status(400).json({
//         message: "Invalid Operation",
//         success: false,
//       });
//     }

//     const selectedProduct = await product.findById(productId);

//     if (!selectedProduct) {
//       return res.status(404).json({
//         message: "Product Not Found",
//         success: false,
//       });
//     }

//     let userCart = await Cart.findOne({ userId });

//     if (!userCart) {
//       Cart = new Cart({ userId, items: [] });
//     }

//     let isItemAlreadyAdded = userCart.items.findIndex(
//       (item) => item.productId.toString() === productId
//     );

//     if (isItemAlreadyAdded == -1) {
//       Cart.items.push({ productId, quantity });
//     } else {
//       Cart.items[isItemAlreadyAdded].quantity += quantity;
//     }

//     await Cart.save();

//     res.status(200).json({
//       success: true,
//       message: "Added to Cart",
//     });
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       message: "Error" + err,
//     });
//   }
// };

const addTocart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        message: "Invalid Operation",
        success: false,
      });
    }

    const selectedProduct = await product.findById(productId);
    if (!selectedProduct) {
      return res.status(404).json({
        message: "Product Not Found",
        success: false,
      });
    }

    let userCart = await Cart.findOne({ userId });
    if (!userCart) {
      userCart = new Cart({ userId, items: [] }); // Create new cart
    }

    const isItemAlreadyAdded = userCart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (isItemAlreadyAdded === -1) {
      userCart.items.push({ productId, quantity });
    } else {
      userCart.items[isItemAlreadyAdded].quantity += quantity;
    }

    await userCart.save();

    res.status(200).json({
      success: true,
      message: "Added to Cart",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error: " + err.message,
    });
  }
};

const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({
        success: false,
        message: "Invalid Cart View for User",
      });
    }

    const findCart = await Cart.findOne({
      userId,
    }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!findCart) {
      res.status(400).json({
        success: false,
        message: "Invalid Cart View for User",
      });
    }

    const validItems = findCart.items.filter(
      (productIem) => productIem.productId
    );

    if (validItems.length < findCart.items.length) {
      findCart.items = validItems;
      await findCart.save();
    }

    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));

    res.status(200).json({
      ...findCart._doc,
      data: populateCartItems,
      success: true,
    });
  } catch (err) {
    // res.status(400).json({
    //   success: false,
    //   message: "ERROR" + err,
    // });
  }
};

const updateCartItems = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Validate required fields
    if (!userId || !productId) {
      return res.status(400).json({
        message: "Invalid Operation",
        success: false,
      });
    }

    // Ensure quantity is a valid number
    const quantityNumber = Number(quantity);
    
    if (isNaN(quantityNumber) || quantityNumber <= 0) {
      return res.status(400).json({
        message: "Invalid quantity value",
        success: false,
      });
    }

    // Fetch cart with populated products
    const cartUser = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cartUser) {
      return res.status(400).json({
        message: "Cart Not Available",
        success: false,
      });
    }

    // Find the product in the cart
    const requestProductId = productId;

    const findCurrentProductIndex = cartUser.items.findIndex(
      (item) => item.productId._id.toString() === requestProductId.toString()
    );

    console.log("Request Product ID:", requestProductId); // Extracted productId (string)
    console.log("Cart Items Product IDs:", cartUser.items.map((item) => item.productId._id.toString())); // Array of strings
    console.log("Matched Index:", findCurrentProductIndex);

    if (findCurrentProductIndex === -1) {
      return res.status(400).json({
        message: "Product Not Found in Cart",
        success: false,
      });
    }

    // Update the quantity
    cartUser.items[findCurrentProductIndex].quantity = quantityNumber;

    // Save the updated cart
    await cartUser.save();

    // Prepare the response data
    const populateCartItems = cartUser.items.map((item) => ({
      productId: item.productId?._id || null,
      image: item.productId?.image || null,
      title: item.productId?.title || "Product Not Found",
      price: item.productId?.price || null,
      salePrice: item.productId?.salePrice || null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      ...cartUser._doc,
      data: populateCartItems,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "ERR " + err.message,
    });
  }
};


const deleteCartItems = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res.status(400).json({
        message: "User Id or Product Id Not Found",
        success: false,
      });
    }

    const findCart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!findCart) {
      return res.status(404).json({
        success: false,
        message: "Cart Not Found",
      });
    }

    // Filter out the product to be deleted
    findCart.items = findCart.items.filter(
      (item) => item.productId._id.toString() !== productId
    );

    // Save the updated cart
    await findCart.save();

    // Map the updated cart items for response
    const populateCartItems = findCart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product Not Found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    // Send response with updated data
    res.status(200).json({
      ...findCart._doc,
      data: populateCartItems,
      success: true,
    });
  } catch (err) {
    console.error("Error deleting cart item:", err);
    res.status(500).json({
      success: false,
      message: "ERROR: " + err.message,
    });
  }
};

module.exports = {
  addTocart,
  fetchCartItems,
  deleteCartItems,
  updateCartItems,
};
