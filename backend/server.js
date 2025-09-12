const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoutes");
const uploadRoute = require("./routes/uploadRoute");
const adminRoutes = require("./routes/adminRoutes");



const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 3000;

//connect to DB
connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to home");
});

//Api Routes
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/upload", uploadRoute);

//Admin
app.use("/api/admin/users", adminRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
