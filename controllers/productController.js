import products from "../models/products.js";
import orders from "../models/orders.js";
import { validateFields } from "../services/validateFields.js";
import brands from "../models/brands.js";
import categories from "../models/categories.js";
import vendors from "../models/vendor.js";
import user from "../models/user.js";
export const addProduct = async (req, res) => {
  try {
    const {
      category,
      sub_category,
      name,
      image,
      mrp,
      price,
      stock_count,
      description,
      features,
      specifications,
      benefits,
      brand,
      vendor_id,
      video_link,
      reviews,
      warranty,
      admin_approval,
    } = req.body;
    // Inline field validation
    const requiredFields = [
      "category",
      "sub_category",
      "name",
      "image",
      "mrp",
      "price",
      "stock_count",
      "description",
      "features",
      "specifications",
      "benefits",
      "brand",
      "vendor_id",
      "video_link",
      "reviews",
      "warranty",
      // "admin_approval",
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        msg: `Please enter ${missingFields.join(", ")}`,
      });
    }

    // Convert brand to uppercase
    const brandUpperCase = brand.toUpperCase();

    // Check if the brand exists and update its categories and sub_categories if necessary
    const brandDocument = await brands.findOne({ name: brandUpperCase });

    if (brandDocument) {
      let updateRequired = false;

      // Check and update categories
      if (!brandDocument.categories.includes(category)) {
        brandDocument.categories.push(category);
        updateRequired = true;
      }

      // Check and update sub_categories
      if (!brandDocument.sub_categories.includes(sub_category)) {
        brandDocument.sub_categories.push(sub_category);
        updateRequired = true;
      }

      // Save the updated brand document if any updates were made
      if (updateRequired) {
        await brandDocument.save();
      }
    } else {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        msg: `Brand ${brandUpperCase} does not exist`,
      });
    }

    // Create and save the new product
    const product = new products({
      category,
      sub_category,
      name,
      image,
      mrp,
      price,
      stock_count,
      description,
      features,
      specifications,
      benefits,
      video_link,
      reviews,
      warranty,
      brand: brandUpperCase,
      vendor_id,
      admin_approval: admin_approval,
    });

    await product.save();

    return res.status(201).json({
      success: true,
      statusCode: 201,
      msg: "Product added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error: " + error,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      category,
      sub_category,
      name,
      image,
      mrp,
      price,
      stock_count,
      description,
      features,
      specifications,
      benefits,
      brand,
      vendor_id,
      video_link,
      reviews,
      warranty,
    } = req.body;

    // Check if the productId is provided
    if (!id) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        msg: "Product ID is required for updating",
      });
    }

    // Check for missing fields
    const missingFields = validateFields(req.body);
    if (missingFields) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        msg: `Please enter ${missingFields.join(", ")}`,
      });
    }

    // Find the product by ID and update its fields
    await products.findByIdAndUpdate(id, {
      category: category,
      sub_category: sub_category,
      name: name,
      image: image,
      mrp: mrp,
      price: price,
      stock_count: stock_count,
      description: description,
      features: features,
      specifications: specifications,
      benefits: benefits,
      video_link: video_link,
      reviews: reviews,
      warranty: warranty,
      brand: brand.toUpperCase(),
      vendor_id: vendor_id,
    });

    return res.status(200).json({
      success: true,
      statusCode: 200,
      msg: "Product updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error: " + error.message,
    });
  }
};

export const addMultipleProducts = async (req, res) => {
  try {
    const productsData = req.body;
    if (!productsData.length) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        msg: "Please enter products data",
      });
    }

    // Fetch all existing brands from the database
    const existingBrands = await brands.find({});

    // Create an array to store new brands
    const newBrands = [];

    // Fetch all existing categories from the database
    const existingCategories = await categories.find({});

    // Iterate through productsData
    for (const product of productsData) {
      product.brand = product.brand.toUpperCase();
      const upperCaseBrand = product.brand.toUpperCase();

      // Check if the brand is new
      let brand = existingBrands.find(
        (brand) => brand.name.toUpperCase() === upperCaseBrand
      );

      if (!brand) {
        // If brand doesn't exist, create a new one
        brand = new brands({
          name: upperCaseBrand,
          categories: [product.category],
          sub_categories: [product.sub_category], // Storing only sub_category names
          image: "required",
        });
        newBrands.push(brand);
      } else {
        // If brand exists, update categories and sub_categories
        if (!brand.categories.includes(product.category)) {
          brand.categories.push(product.category);
        }
        if (!brand.sub_categories.includes(product.sub_category)) {
          brand.sub_categories.push(product.sub_category); // Storing only sub_category names
        }
      }

      // Check if the category exists
      let existingCategory = existingCategories.find(
        (cat) => cat.name === product.category
      );

      if (!existingCategory) {
        // If category doesn't exist, create a new one
        existingCategory = new categories({
          name: product.category,
          sub_categories: [], // Initialize as an empty array
        });
      }

      // Check if the sub-category already exists within the category
      const existingSubCategory = existingCategory.sub_categories.find(
        (subCat) => subCat.name === product.sub_category
      );

      if (!existingSubCategory) {
        // Spread the existing sub-categories array and add the new sub-category
        existingCategory.sub_categories.push({
          name: product.sub_category,
          image: "required",
        });
      }

      // Save the updated category
      await existingCategory.save();
    }

    // Insert new brands into the brands collection
    if (newBrands.length > 0) {
      await brands.insertMany(newBrands);
    } else {
      // Save existing brands with updated categories and sub_categories
      await Promise.all(existingBrands.map((brand) => brand.save()));
    }

    // Insert products into the products collection
    await products.insertMany(productsData);

    // Perform aggregation to update categories collection
    const pipeline = [
      {
        $group: {
          _id: "$name",
          sub_categories: { $first: "$sub_categories" }, // Take the first sub_categories array encountered
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          sub_categories: 1,
        },
      },
      {
        $out: "categories",
      },
    ];

    await categories.aggregate(pipeline).exec();

    return res.status(201).json({
      success: true,
      statusCode: 201,
      msg: "Products added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error" + " " + error,
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categoriesData = await categories.find({});
    return res.status(200).json({
      success: true,
      statusCode: 200,
      msg: "categories fetched successfully",
      data: categoriesData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error" + " " + error,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const aggregatedProducts = await products.aggregate([
      {
        $match: {
          admin_approval: true, // Fetch only products with admin_approval as true
        },
      },
      {
        $group: {
          _id: {
            category: "$category",
            sub_category: "$sub_category",
          },
          products: {
            $push: {
              _id: "$_id",
              name: "$name",
              category: "$category",
              sub_category: "$sub_category",
              image: "$image",
              price: "$price",
              mrp: "$mrp",
              stock_count: "$stock_count",
              description: "$description",
              features: "$features",
              specifications: "$specifications",
              video_link: "$video_link",
              reviews: "$reviews",
              benefits: "$benefits",
              warranty: "$warranty",
              brand: { $toLower: "$brand" }, // Convert brand to lowercase
              admin_approval: "$admin_approval",
              vendor_id: "$vendor_id",
            },
          },
        },
      },
      {
        $group: {
          _id: "$_id.category",
          sub_categories: {
            $push: {
              name: "$_id.sub_category",
              image: { $first: "$products.image" }, // Take the first image encountered
            },
          },
          products: { $push: "$products" }, // Collect products for each category
        },
      },
      {
        $lookup: {
          from: "brands",
          let: { category: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: [
                    { $toLower: "$$category" },
                    {
                      $map: {
                        input: "$categories",
                        as: "cat",
                        in: { $toLower: "$$cat" },
                      },
                    },
                  ],
                },
              },
            },
          ],
          as: "brands",
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          sub_categories: 1,
          products: 1,
          brands: {
            $map: {
              input: "$brands",
              as: "brand",
              in: {
                name: "$$brand.name",
                image: "$$brand.image",
                sub_categories: "$$brand.sub_categories",
              },
            },
          },
        },
      },
      {
        $project: {
          category: 1,
          sub_categories: 1,
          products: 1,
          brands: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      statusCode: 200,
      msg: "Products fetched successfully",
      count: aggregatedProducts.length,
      data: aggregatedProducts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error" + " " + error,
    });
  }
};

export const getProductsForAdmin = async (req, res) => {
  try {
    const aggregatedProducts = await products.aggregate([
      {
        $group: {
          _id: {
            category: "$category",
            sub_category: "$sub_category",
          },
          products: {
            $push: {
              _id: "$_id",
              name: "$name",
              category: "$category",
              sub_category: "$sub_category",
              image: "$image",
              price: "$price",
              mrp: "$mrp",
              stock_count: "$stock_count",
              description: "$description",
              features: "$features",
              specifications: "$specifications",
              video_link: "$video_link",
              reviews: "$reviews",
              benefits: "$benefits",
              warranty: "$warranty",
              brand: { $toLower: "$brand" }, // Convert brand to lowercase
              admin_approval: "$admin_approval",
            },
          },
        },
      },
      {
        $group: {
          _id: "$_id.category",
          sub_categories: {
            $push: {
              name: "$_id.sub_category",
              image: { $first: "$products.image" }, // Take the first image encountered
            },
          },
          products: { $push: "$products" }, // Collect products for each category
        },
      },
      {
        $lookup: {
          from: "brands",
          let: { category: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: [
                    { $toLower: "$$category" },
                    {
                      $map: {
                        input: "$categories",
                        as: "cat",
                        in: { $toLower: "$$cat" },
                      },
                    },
                  ],
                },
              },
            },
          ],
          as: "brands",
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          sub_categories: 1,
          products: 1,
          brands: {
            $map: {
              input: "$brands",
              as: "brand",
              in: {
                name: "$$brand.name",
                image: "$$brand.image",
                sub_categories: "$$brand.sub_categories",
              },
            },
          },
        },
      },
      {
        $project: {
          category: 1,
          sub_categories: 1,
          products: 1,
          brands: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      statusCode: 200,
      msg: "Products fetched successfully",
      count: aggregatedProducts.length,
      data: aggregatedProducts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error" + " " + error,
    });
  }
};

export const getProductByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    console.log(category);
    console.log(decodeURIComponent(category).toString());
    const productsData = await products.find({
      category: decodeURIComponent(category).toString(),
    });
    return res.status(200).json({
      success: true,
      statusCode: 200,
      msg: "products fetched successfully",
      data: productsData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error" + " " + error,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const productData = await products.findById(id).exec();
    return res.status(200).json({
      success: true,
      statusCode: 200,
      msg: "product fetched successfully",
      data: productData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error" + " " + error,
    });
  }
};

export const getProductByBrand = async (req, res) => {
  try {
    const brand = req.params.brand;

    const productsData = await products.find({ brand: brand });
    return res.status(200).json({
      success: true,
      statusCode: 200,
      msg: "products fetched successfully",
      data: productsData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error" + " " + error,
    });
  }
};

export const getProductsForAdminApproval = async (req, res) => {
  try {
    const productsData = await products.find({ admin_approval: false });
    return res.status(200).json({
      success: true,
      statusCode: 200,
      msg: "products fetched successfully",
      data: productsData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error" + " " + error,
    });
  }
};

export const getProductsBySubCategory = async (req, res) => {
  try {
    const subCategory = req.params.subCategory;
    const productsData = await products.find({ sub_category: subCategory });
    return res.status(200).json({
      success: true,
      statusCode: 200,
      msg: "products fetched successfully",
      data: productsData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error" + " " + error,
    });
  }
};

export const getCounts = async (req, res) => {
  try {
    const userCount = await user.countDocuments();
    const productCount = await products.countDocuments();
    const orderCount = await orders.countDocuments();
    const categoriesCount = await categories.countDocuments();
    const brandsCount = await brands.countDocuments();
    const vendorsCount = await vendors.countDocuments();

    return res.status(200).json({
      success: true,
      userCount,
      productCount,
      categoriesCount,
      brandsCount,
      orderCount,
      vendorsCount,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal server error" + " " + error,
    });
  }
};

export const approveProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    await products.findByIdAndUpdate(id, { admin_approval: true });
    return res.status(200).json({
      success: true,
      statusCode: 200,
      msg: "Product approved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error: " + error.message,
    });
  }
};

export const getProductsByVendor = async (req, res) => {
  try {
    const { id } = req.params;

    const aggregatedProducts = await products.aggregate([
      {
        $match: {
          // Fetch only products with admin_approval as true
          vendor_id: id, // Fetch products matching the vendor_id
        },
      },
      {
        $group: {
          _id: {
            category: "$category",
            sub_category: "$sub_category",
          },
          products: {
            $push: {
              _id: "$_id",
              name: "$name",
              category: "$category",
              sub_category: "$sub_category",
              image: "$image",
              price: "$price",
              mrp: "$mrp",
              stock_count: "$stock_count",
              description: "$description",
              features: "$features",
              specifications: "$specifications",
              video_link: "$video_link",
              reviews: "$reviews",
              benefits: "$benefits",
              warranty: "$warranty",
              brand: "$brand",
              admin_approval: "$admin_approval",
            },
          },
        },
      },
      {
        $group: {
          _id: "$_id.category",
          sub_categories: {
            $push: {
              name: "$_id.sub_category",
              image: { $first: "$products.image" }, // Take the first image encountered
            },
          },
          products: { $push: "$products" }, // Collect products for each category
        },
      },
      {
        $lookup: {
          from: "brands",
          localField: "_id",
          foreignField: "categories",
          as: "brands",
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          sub_categories: 1,
          products: 1,
          brands: {
            $map: {
              input: "$brands",
              as: "brand",
              in: {
                name: "$$brand.name",
                image: "$$brand.image",
                sub_categories: "$$brand.sub_categories",
              },
            },
          },
        },
      },
      {
        $project: {
          category: 1,
          sub_categories: 1,
          products: 1,
          brands: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      statusCode: 200,
      msg: "Products fetched successfully",
      data: aggregatedProducts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error" + " " + error,
    });
  }
};

export const getCountsForVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const productCount = await products.countDocuments({ vendor_id: id });
    const orderCount = await orders.countDocuments({ vendor_id: id });
    const categoriesCount = await products.distinct("category", {
      vendor_id: id,
    });
    const brandsCount = await products.distinct("brand", { vendor_id: id });

    return res.status(200).json({
      success: true,
      productCount,
      orderCount,
      categoriesCount: categoriesCount.length,
      brandsCount: brandsCount.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal server error" + " " + error,
    });
  }
};

export const addReviewToProduct = async (req, res) => {
  try {
    const { productId, userId, rating, review, title } = req.body;

    // Find the product by ID
    const product = await products.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Create a new review object
    const newReview = {
      user_id: userId,
      title: title,
      rating: rating,
      review: review,
      date: new Date(),
    };

    // Add the new review to the reviews array
    product.reviews.push(newReview);

    // Save the updated product
    await product.save();

    res.status(200).json({ message: "Review added successfully", product });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const editReviewForProduct = async (req, res) => {
  try {
    const { productId, userId, rating, review, title } = req.body;

    // Find the product by ID
    const product = await products.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find the review by user ID
    const reviewIndex = product.reviews.findIndex(
      (r) => r.user_id.toString() === userId
    );
    if (reviewIndex === -1) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Update the review content and rating
    product.reviews[reviewIndex].rating = rating;
    product.reviews[reviewIndex].title = title;
    product.reviews[reviewIndex].review = review;
    product.reviews[reviewIndex].date = new Date(); // Update the date to the current date

    // Save the updated product
    await product.save();

    res.status(200).json({ message: "Review updated successfully", product });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteReviewFromProduct = async (req, res) => {
  try {
    const { productId, userId } = req.body;

    // Find the product by ID
    const product = await products.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find the review by user ID
    const reviewIndex = product.reviews.findIndex(
      (r) => r.user_id.toString() === userId
    );
    if (reviewIndex === -1) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Remove the review from the reviews array
    product.reviews.splice(reviewIndex, 1);

    // Save the updated product
    await product.save();

    res.status(200).json({ message: "Review deleted successfully", product });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const search = req.params.search;
    const productsData = await products.find({
      name: { $regex: search, $options: "i" },
    });
    const categoriesData = await categories.find({
      name: { $regex: search, $options: "i" },
    });
    const brandsData = await brands.find({
      name: { $regex: search, $options: "i" },
    });

    return res.status(200).json({
      success: true,
      statusCode: 200,
      msg: "Data fetched successfully",
      data: {
        categories: categoriesData,
        brands: brandsData,
        products: productsData,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error",
      error: error.message,
    });
  }
};
