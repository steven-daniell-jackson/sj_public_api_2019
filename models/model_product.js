const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    shortDescription: {
      type: String
    },
    price: {
      type: String
    },
    salePrice: {
      type: String
    },
    quantity: {
      type: String
    },
    virtual: {
      type: Boolean
    },
    active: {
      type: Boolean
    },
    productImgs: {
      type: String
    },
    category: {
      type: String
    },
    subCategories: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
