const Product = require("../../models/model_product");
const { dateToString } = require("../../helpers/date");

module.exports = {
  /* async product Query Function() 
     Return all products
  */
  products: async () => {
    try {
      const products = await Product.find();
      return products.map(product => {
        return {
          ...product._doc,
          _id: product.id,
          _createdAt: dateToString(product.createdAt)
        };
      });
    } catch (err) {
      throw err;
    }
  },
  /* async createproduct Mutation Function()
    @Params:  productInput {
   productName: String!
    description: String!
    shortDescription: String
    price: Int!
    salePrice: Int
    quantity: Int
    virtual: Boolean
    active: Boolean
    productImgs: String
    category: String
    subCategories: String
    */
  createProduct: async args => {
    const product = new Product({
      productName: args.productInput.productName,
      description: args.productInput.description,
      shortDescription: args.productInput.shortDescription,
      price: +args.productInput.price,
      salePrice: +args.productInput.salePrice,
      quantity: +args.productInput.quantity,
      virtual: args.productInput.virtual,
      active: args.productInput.active,
      productImgs: args.productInput.productImgs,
      category: args.productInput.category,
      subCategories: args.productInput.subCategories
    });

    try {
      const result = await product.save();
      return {
        ...result._doc, // Return Internal Mongo User Doc
        _id: result.id, // Assign _id to (Mongo)result.id
        _createdAt: dateToString(result.createdAt) // Assign _createdAt to (Mongo)result.createdAt
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
