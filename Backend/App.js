const express = require("express");
const app = express();
const connectDB = require("./configs/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = 5000;
const authRouter = require("./routers/authRoute.js");
const productRoutes = require("./routers/Admin/productRoutes.js");
const productRoutesUser = require("./routers/user-view/productsRoutesUser.js");
const cartRouter = require("./routers/Cart/cartRouter.js");
const addressRoute = require("./routers/user-view/addressRoutes.js");

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: [
      "Content-type",
      "Authorization",
      "Cache-control",
      "Expiry",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/admin/products", productRoutes);
app.use("/api/shop/products", productRoutesUser);
app.use("/api/shop/cart", cartRouter);
app.use("/api/shop/address",addressRoute );

connectDB()
  .then(() => {
    console.log("Database Connected Successfully...");
    app.listen(PORT);
    console.log(`Backend is Running on Port ${PORT}`);
  })
  .catch((err) => {
    console.log("ERROR :" + err.message);
  });
