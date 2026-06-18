const Category = require("../models/Category");
const slugify = require("slugify");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");
const Product =
require("../models/Product");

const cloudinary =
require("../config/cloudinary");

exports.createCategory = asyncHandler(
  async (req, res) => {
    console.log("CATEGORY BODY");
      console.log(req.body);

      const { name, description, image } = req.body;

    const existingCategory =
      await Category.findOne({ name });

    if (existingCategory) {
      console.log("CATEGORY EXISTS");
      return ApiResponse.error(
        res,
        "Category already exists",
        400
      );
    }

    const category =
    await Category.create({

      name,

      slug: slugify(name,{
        lower:true,
        strict:true
      }),

      description,

      image: {
        url:
          image?.url || "",

        publicId:
          image?.publicId || "",
      },

    });

    ApiResponse.success(
      res,
      "Category created successfully",
      category,
      201
    );
  }
);

exports.getCategories = asyncHandler(
  async (req, res) => {
    const categories =
      await Category.find().sort({
        createdAt: -1,
      });

    ApiResponse.success(
      res,
      "Categories fetched successfully",
      categories
    );
  }
);

exports.getCategoryById =
  asyncHandler(async (req, res) => {
    const category =
      await Category.findById(
        req.params.id
      );

    if (!category) {
      return ApiResponse.error(
        res,
        "Category not found",
        404
      );
    }

    ApiResponse.success(
      res,
      "Category fetched successfully",
      category
    );
  });

exports.updateCategory =
  asyncHandler(async (req, res) => {
    const { name, description, image } =
      req.body;

    const category =
      await Category.findById(
        req.params.id
      );

    if (!category) {
      return ApiResponse.error(
        res,
        "Category not found",
        404
      );
    }

    category.name =
      name || category.name;

    category.slug = slugify(
      category.name,
      {
        lower: true,
        strict: true,
      }
    );

    category.description =
      description ??
      category.description;

    if(image){

      category.image = {

        url:
          image.url,

        publicId:
          image.publicId,

      };

    }

    await category.save();

    ApiResponse.success(
      res,
      "Category updated successfully",
      category
    );
  });

exports.deleteCategory =
asyncHandler(async (
req,
res
)=>{

const category =
await Category.findById(
req.params.id
);

if(!category){

return ApiResponse.error(
res,
"Category not found",
404
);

}

const productCount =
await Product.countDocuments({

category:
category._id

});

if(productCount > 0){

return ApiResponse.error(
res,
"Delete products first",
400
);

}

if(
category.image &&
category.image.publicId
){

await cloudinary
.uploader
.destroy(
category.image.publicId
);

}

await Category.findByIdAndDelete(
req.params.id
);

ApiResponse.success(
res,
"Category deleted successfully"
);

});