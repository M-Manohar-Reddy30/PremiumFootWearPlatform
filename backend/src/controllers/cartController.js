const User = require("../models/User");
const Product = require("../models/Product");

exports.addToCart = async (
  req,
  res
) => {
  try {
    const {
      productId,
      quantity,
      size,
      color,
    } = req.body;

    const user =
      await User.findOne({
        clerkId: req.user.sub,
      });

    const product =
      await Product.findById(
        productId
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Find if product already exists in cart
    const existingItem =
      user.cart.find(
      (item)=>

      item.product.toString() ===
      productId &&

      item.size === size &&

      item.color === color

      );

    // Current quantity already in cart
    const currentQty =
      existingItem
        ? existingItem.quantity
        : 0;

    // Quantity after adding
    const requestedQty =
      currentQty +
      (quantity || 1);

    // Stock check
    if (
      requestedQty >
      product.stock
    ) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} items available in stock`,
      });
    }

    // Add to cart
    if (existingItem) {
      existingItem.quantity =
        requestedQty;
    } else {
      user.cart.push({

        product:
        productId,

        size,

        color,

        quantity:
        quantity || 1,

      });
    }

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Added to cart",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

exports.getCart = async (
  req,
  res
) => {
  try {
    const user =
      await User.findOne({
        clerkId: req.user.sub,
      }).populate(
        "cart.product"
      );

    let subtotal = 0;

    user.cart.forEach(
      (item) => {
        const price =
          item.product
            .discountPrice ||
          item.product.price;

        subtotal +=
          price *
          item.quantity;
      }
    );

    res.status(200).json({
      success: true,

      data: user.cart,

      summary: {
        subtotal,
        total: subtotal,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

exports.updateCartItem =
  async (
    req,
    res
  ) => {
    try {
      const {
        productId,
        quantity,
      } = req.body;

      const product =
      await Product.findById(
        productId
      );

    if (!product) {

      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    }

    if (
      quantity >
      product.stock
    ) {

      return res.status(400).json({
        success: false,
        message:
          `Only ${product.stock} items available`,
      });

    }

      const user =
        await User.findOne({
          clerkId:
            req.user.sub,
        });

      const item =
        user.cart.find(
          (i) =>
            i.product.toString() ===
            productId
        );

      if (!item) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Item not found",
          });
      }

      item.quantity =
        quantity;

      await user.save();

      res.status(200).json({
        success: true,
        message:
          "Cart updated",
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

  exports.removeFromCart =
  async (
    req,
    res
  ) => {
    try {
      const {
      productId,
      size,
      color,
    } = req.body;

      const user =
        await User.findOne({
          clerkId:
            req.user.sub,
        });

      user.cart =
        user.cart.filter(
        (item)=>

        !(
          item.product.toString() ===
          productId &&

          item.size === size &&

          item.color === color
        )

      );

      await user.save();

      res.status(200).json({
        success: true,
        message:
          "Removed from cart",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };