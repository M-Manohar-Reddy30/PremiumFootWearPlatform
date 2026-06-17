const Category = require("../models/Category");
const slugify = require("slugify");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

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
        slug: slugify(name, {
          lower: true,
          strict: true,
        }),
        description,
        image,
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

    category.image =
      image ?? category.image;

    await category.save();

    ApiResponse.success(
      res,
      "Category updated successfully",
      category
    );
  });

exports.deleteCategory =
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

    await category.deleteOne();

    ApiResponse.success(
      res,
      "Category deleted successfully"
    );
  });