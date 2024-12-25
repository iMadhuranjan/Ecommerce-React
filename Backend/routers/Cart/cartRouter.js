const express= require('express');
const { addTocart, fetchCartItems, updateCartItems, deleteCartItems } = require('../../controllers/user-View/castController');
const router=express.Router();



router.post("/addcast" , addTocart);
router.get("/get/:userId" , fetchCartItems);
router.put("/update" , updateCartItems);
router.delete("/:userId/:productId" , deleteCartItems);


module.exports=router;