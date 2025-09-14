const express = require("express");
const Product = require("../models/Products");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// route POST /api/admin/products
router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      type,
      place,
      interiorBudget,
      roughBudget,
      acreage,
      status,
      images,
    } = req.body;

    const product = new Product({
      name,
      type,
      place,
      interiorBudget,
      roughBudget,
      acreage,
      status,
      images,
      user: req.user._id, // Reference to the admin user who created it
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//route PUT /api/admin/products/:id
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const {
      name,
      type,
      place,
      interiorBudget,
      roughBudget,
      acreage,
      status,
      images,
    } = req.body;
    // Find product by ID
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.type = type || product.type;
      product.place = place || product.place;
      product.interiorBudget = interiorBudget || product.interiorBudget;
      product.roughBudget = roughBudget || product.roughBudget;
      product.acreage = acreage || product.acreage;
      product.status = status || product.status;
      product.images = images || product.images;
      // Save tbe updated product
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//route DELETE /api/admin/products/:id
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    // Find product by ID
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//route GET /api/products/new-arrivals
router.get("/new-arrivals", async (req, res) => {
  try {
    //Fetch lates 8 prodcuts
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
    res.json(newArrivals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//route GET /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(400).json({ message: "Product Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// route GET /api/products
// ucts
router.get("/", async (req, res) => {
  try {
    const {
      search,
      type,
      place,
      status,
      mininteriorBudget,
      maxinteriorBudget,
      minroughBudget,
      maxroughBudget,
      page,
      limit,
    } = req.query;

    let query = {};

    //Filter logic
    if (type && type.toLowerCase() !== "all") {
      query.type = type;
    }

    if (place && place.toLowerCase() !== "all") {
      query.place = place;
    }

    if (status && status.toLowerCase() !== "all") {
      query.status = status;
    }

    if (mininteriorBudget || maxinteriorBudget) {
      query.interiorBudget = {};
      if (mininteriorBudget)
        query.interiorBudget.$gte = Number(mininteriorBudget);
      if (maxinteriorBudget)
        query.interiorBudget.$lte = Number(maxinteriorBudget);
    }

    if (minroughBudget || maxroughBudget) {
      query.roughBudget = {};
      if (minroughBudget) query.roughBudget.$gte = Number(minroughBudget);
      if (maxroughBudget) query.roughBudget.$lte = Number(maxroughBudget);
    }

    if (search) {
      query.$or = [{ name: { $regex: search, $options: "i" } }];
    }

    // Phân trang
    const pageNumber = Number(page) || 1;
    const pageSize = Number(limit) || 20;
    const skip = (pageNumber - 1) * pageSize;

    // Fetch products and apply sorting and limit
    const products = await Product.find(query)
      .skip(skip)
      .limit(pageSize)
      .lean();

    // Tổng số sản phẩm (phục vụ frontend phân trang)
    const total = await Product.countDocuments(query);
    res.json({
      products,
      page: pageNumber,
      pages: Math.ceil(total / pageSize),
      total,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
