const Product = require("../models/Product");
const Category = require("../models/Category");
const slugify = require("slugify");
const cloudinary = require("../config/cloudinary");
const Review =
require("../models/Review");

const createProduct = async (req, res) => {
  try {

    console.log("PRODUCT BODY");
    console.log(JSON.stringify(req.body, null, 2));

    const {
      name,
      description,
      price,
      discountPrice,
      category,

      brand,
      gender,
      material,
      occasion,

      sizes,
      colors,

      stock,

      featured,
      trending,
      newArrival,

      images,
    } = req.body;

    const categoryExists =
      await Category.findById(category);

    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Generate unique slug
    const baseSlug = slugify(name, {
      lower: true,
      strict: true,
    });

    const slug =
      `${baseSlug}-${Date.now()}`;

    const product =
      await Product.create({
        name,
        slug,
        description,
        price,
        discountPrice,

        category,

        brand,
        gender,
        material,
        occasion,

        sizes,
        colors,

        stock,

        featured,
        trending,
        newArrival,
        images,
      });

    res.status(201).json({
      success: true,
      product,
    });

  } catch (error) {

    console.error(
      "CREATE PRODUCT ERROR"
    );

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getProducts = async (req, res) => {
  try {

    const page =
      parseInt(req.query.page) || 1;

    const limit =
      parseInt(req.query.limit) || 10;

    const skip =
      (page - 1) * limit;

    const {
      search,
      category,

      brand,
      gender,
      material,
      occasion,

      featured,
      trending,
      newArrival,

      sort,

      size,
      color,

      minPrice,
      maxPrice,
    } = req.query;

    const query = {
      isActive: true,
    };

    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (category) {
      query.category = category;
    }

    if (brand) {
      query.brand = brand;
    }

    if (gender) {
      query.gender = gender;
    }

    if (material) {
      query.material = material;
    }

    if (occasion) {
      query.occasion = occasion;
    }

    if (size) {
      query.sizes = size;
    }

    if (color) {
      query.colors = color;
    }

    if (featured === "true") {
      query.featured = true;
    }

    if (trending === "true") {
      query.trending = true;
    }

    if (newArrival === "true") {
      query.newArrival = true;
    }

    if (minPrice || maxPrice) {

      query.price = {};

      if (minPrice) {
        query.price.$gte =
          Number(minPrice);
      }

      if (maxPrice) {
        query.price.$lte =
          Number(maxPrice);
      }

    }

    let sortOption = {
      createdAt: -1,
    };

    if (sort) {
      if (sort === "price") {
        sortOption = {
          price: 1,
        };
      }

      if (sort === "-price") {
        sortOption = {
          price: -1,
        };
      }

      if (
        sort === "createdAt" ||
        sort === "-createdAt"
      ) {
        sortOption = {
          createdAt: -1,
        };
      }
    }

    const total =
      await Product.countDocuments(
        query
      );

    const products =
      await Product.find(query)
        .populate("category")
        .sort(sortOption)
        .skip(skip)
        .limit(limit);

    res.status(200).json({
      success: true,

      products,

      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(
          total / limit
        ),
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getAdminProducts =
async (req,res) => {

try {

const products =
await Product.find()
.populate("category")
.sort({
createdAt:-1
});

res.status(200).json({
success:true,
products
});

}
catch(error){

res.status(500).json({
success:false,
message:error.message
});

}
};

const getProductById = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      ).populate("category");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProductBySlug = async (
  req,
  res
) => {

  try {

    const product =
      await Product.findOne({
        slug: req.params.slug,
        isActive: true,
      })
      .populate("category");

    if (!product) {

      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    }

    res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

const updateProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProduct = async (
  req,
  res
) => {

  try {

    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {

      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    }

    // Delete images from Cloudinary

    if (
      product.images &&
      product.images.length > 0
    ) {

      for (const image of product.images) {

        if (image.publicId) {

          await cloudinary.uploader.destroy(
            image.publicId
          );

        }

      }

    }

    // Find reviews for product

    const reviews =
    await Review.find({

      product:
      product._id

    });

    // Delete review images

    for(const review of reviews){

      if(
        review.images &&
        review.images.length > 0
      ){

        for(
          const image
          of review.images
        ){

          if(image.publicId){

            await cloudinary
            .uploader
            .destroy(
              image.publicId
            );

          }

        }

      }

    }

    // Delete reviews

    await Review.deleteMany({

      product:
      product._id

    });

    // Delete product

    await Product.findByIdAndDelete(
      req.params.id
    );

    // Delete product from MongoDB

    await Product.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({

      success: true,

      message:
        "Product permanently deleted",

    });

  }

  catch (error) {

    console.error(
      "DELETE PRODUCT ERROR"
    );

    console.error(error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

const restoreProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.isActive = true;

    await product.save();

    res.status(200).json({
      success: true,
      message:
        "Product restored successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProductsByCategory =
async (req,res) => {

try{

const category =
await Category.findOne({
slug:req.params.slug
});

if(!category){

return res.status(404).json({
success:false,
message:"Category not found"
});

}

const products =
await Product.find({

category:
category._id,

isActive:true

})
.populate("category")
.sort({
createdAt:-1
});

res.status(200).json({

success:true,

category,

products

});

}
catch(error){

res.status(500).json({
success:false,
message:error.message
});

}

};

const getFilterOptions = async (
  req,
  res
) => {

  try {

    const brands =
      await Product.distinct(
        "brand",
        { isActive: true }
      );

    const genders =
      await Product.distinct(
        "gender",
        { isActive: true }
      );

    const materials =
      await Product.distinct(
        "material",
        { isActive: true }
      );

    const occasions =
      await Product.distinct(
        "occasion",
        { isActive: true }
      );

    const sizes =
    (
      await Product.distinct(
      "sizes",
      { isActive:true }
      )
    ).filter(Boolean);

    const colors =
    (
      await Product.distinct(
      "colors",
      { isActive:true }
      )
    ).filter(Boolean);

    res.json({

      success:true,

      brands,
      genders,
      materials,
      occasions,
      sizes,
      colors,

    });

  }

  catch(error){

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }

};

module.exports = {
  createProduct,
  getProducts,
  getAdminProducts,
  getProductById,
  getProductBySlug,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
  restoreProduct,
  getFilterOptions,
};