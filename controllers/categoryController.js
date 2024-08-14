// import brands from "../models/brands.js";
// import categories from "../models/categories.js";

// export const addCategory = async (req, res) => {
//   try {
//     const { name, sub_categories } = req.body;
//     if (!name) {
//       return res.status(400).json({
//         success: false,
//         statusCode: 400,
//         msg: "Please enter category name",
//       });
//     } else if (!sub_categories) {
//       return res.status(400).json({
//         success: false,
//         statusCode: 400,
//         msg: "Please enter sub categories",
//       });
//     }
//     const category = new categories({
//       name: name,
//       sub_categories: sub_categories,
//     });

//     await category.save();

//     return res.status(201).json({
//       success: true,
//       statusCode: 201,
//       msg: "Category added successfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       statusCode: 500,
//       msg: "Internal server error" + "" + error,
//     });
//   }
// };

// export const getCategories = async (req, res) => {
//   try {
//     const categoriesData = await categories.aggregate([
//       {
//         $lookup: {
//           from: "products",
//           localField: "name",
//           foreignField: "category",
//           as: "products",
//         },
//       },
//       {
//         $project: {
//           _id: 1,
//           name: 1,
//           sub_categories: 1,
//           total_products: { $size: "$products" },
//         },
//       },
//     ]);

//     return res.status(200).json({
//       success: true,
//       statusCode: 200,
//       msg: "Categories fetched successfully",
//       data: categoriesData,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       statusCode: 500,
//       msg: "Internal server error" + " " + error,
//     });
//   }
// };

// export const getBrands = async (req, res) => {
//   try {
//     const brandsData = await brands.aggregate([
//       {
//         $lookup: {
//           from: "products",
//           localField: "name", // Assuming 'name' field in brands collection corresponds to 'brand' field in products collection
//           foreignField: "brand",
//           as: "products",
//         },
//       },
//       { 
//         $project: {
//           _id: 1,
//           name: 1,
//           categories: 1,
//           sub_categories: 1,
//           image: 1,
//           total_products: { $size: "$products" },
//         },
//       },
//     ]);

//     return res.status(200).json({
//       success: true,
//       statusCode: 200,
//       msg: "Brands fetched successfully",
//       data: brandsData,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       statusCode: 500,
//       msg: "Internal server error" + " " + error,
//     });
//   }
// };

// export const addBrand = async (req, res) => {
//   try {
//     const { name, image, categories, sub_categories } = req.body;
//     if (!name) {
//       return res.status(400).json({
//         success: false,
//         statusCode: 400,
//         msg: "Please enter brand name",
//       });
//     }
//     const brand = new brands({
//       name: name.toUpperCase(),
//       image: image,
//       categories: categories,
//       sub_categories: sub_categories,
//     });

//     await brand.save();

//     return res.status(201).json({
//       success: true,
//       statusCode: 201,
//       msg: "Brand added successfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       statusCode: 500,
//       msg: "Internal server error" + "" + error,
//     });
//   }
// };

// export const getSubCategoriesByCategory = async (req, res) => {
//   try {
//     const { category } = req.params;
//     if (!category) {
//       return res.status(400).json({
//         success: false,
//         statusCode: 400,
//         msg: "Please enter category name",
//       });
//     }
//     const subCategories = await categories.findOne({ name: category });
//     if (!subCategories) {
//       return res.status(404).json({
//         success: false,
//         statusCode: 404,
//         msg: "Category not found",
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       statusCode: 200,
//       msg: "Sub categories fetched successfully",
//       data: subCategories.sub_categories,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       statusCode: 500,
//       msg: "Internal server error" + "" + error,
//     });
//   }
// };




import brands from '../models/brands.js';
import categories from '../models/categories.js';

// Add a new category
export const addCategory = async (req, res) => {
  const { name, sub_categories } = req.body;

  if (!name || !sub_categories) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      msg: "Please enter both category name and sub categories",
    });
  }

  try {
    const category = new categories({
      name,
      sub_categories,
    });

    await category.save();

    return res.status(201).json({
      success: true,
      statusCode: 201,
      msg: "Category added successfully",
    });
  } catch (error) {
    console.error("Error adding category:", error);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error: " + error.message,
    });
  }
};

// Get all categories with product aggregation
export const getCategories = async (req, res) => {
  try {
    const categoriesData = await categories.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "name",
          foreignField: "category",
          as: "products",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          sub_categories: 1,
          total_products: { $size: "$products" },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      statusCode: 200,
      msg: "Categories fetched successfully",
      data: categoriesData,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error: " + error.message,
    });
  }
};

// Get all brands with product aggregation
export const getBrands = async (req, res) => {
  try {
    const brandsData = await brands.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "name",
          foreignField: "brand",
          as: "products",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          categories: 1,
          sub_categories: 1,
          image: 1,
          total_products: { $size: "$products" },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      statusCode: 200,
      msg: "Brands fetched successfully",
      data: brandsData,
    });
  } catch (error) {
    console.error("Error fetching brands:", error);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error: " + error.message,
    });
  }
};


// Add a new brand
export const addBrand = async (req, res) => {
  const { name, image, categories, sub_categories } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      msg: "Please enter brand name",
    });
  }

  try {
    const brand = new brands({
      name: name.toUpperCase(),
      image,
      categories,
      sub_categories,
    });

    await brand.save();

    return res.status(201).json({
      success: true,
      statusCode: 201,
      msg: "Brand added successfully",
    });
  } catch (error) {
    console.error("Error adding brand:", error);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error: " + error.message,
    });
  }
};

// Get subcategories by category name
export const getSubCategoriesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    if (!category) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        msg: "Please enter a category name",
      });
    }
    const subCategories = await categories.findOne({ name: category });
    if (!subCategories) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        msg: "Category not found",
      });
    }
    return res.status(200).json({
      success: true,
      statusCode: 200,
      msg: "Sub categories fetched successfully",
      data: subCategories.sub_categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      msg: "Internal server error: " + error.message,
    });
  }
};

