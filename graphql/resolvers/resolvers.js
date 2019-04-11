const authResolver = require("./resolver_auth");
const taskResolver = require("./resolver_task");
const userResolver = require("./resolver_user");
const productResolver = require("./resolver_product");

const rootResolver = {
  ...authResolver,
  ...taskResolver,
  ...userResolver,
  ...productResolver
};

module.exports = rootResolver;
