const { buildSchema } = require("graphql");

module.exports = buildSchema(`


type User {
  _id: ID!
  email: String!
  password: String
  firstName: String
  lastName: String
  age: Int 
  dateOfBirth: String
  address: String
  ethnicity: String
  contactNumber: String
  hobbies: String
  profileImg: String
  priviledges: String
  active: String
  _createdAt: String!
  updatedAt: String!
}


input UserInput {
  email: String!
  password: String!
  firstName: String
  lastName: String
  age: Int 
  dateOfBirth: String
  address: String
  ethnicity: String
  contactNumber: String
  hobbies: String
  profileImg: String
  priviledges: String
  active: String
}

type Task {
  _id: ID!
  taskName: String!
  description: String
  status: String
  githubLink: String
  _createdAt: String!
  
}

input TaskOne {
  _id: String!
  }

input TaskInput {
  taskName: String!
  description: String!
  status: String!
  githubLink: String
}

input TaskUpdate {
  _id : ID
  taskName: String!
  description: String
  status: String!
  githubLink: String
  }

input TaskDelete {
_id: String!
}


type Product {
  _id: ID!
  productName: String!
  description: String!
  shortDescription: String
  price: Int
  salePrice: Int
  quantity: Int
  virtual: Boolean
  active: Boolean
  productImgs: String
  category: String
  subCategories: String
  _createdAt: String!
}

input ProductInput {
  productName: String!
  description: String!
  shortDescription: String
  price: Int = 0
  salePrice: Int = 0
  quantity: Int = 0
  virtual: Boolean = false
  active: Boolean = false
  productImgs: String
  category: String
  subCategories: String
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}


type RootQuery {
  tasks: [Task!]!
  products: [Product!]!
  users: [User!]!
  login(email: String!, password: String!): AuthData!
}

type RootMutation {
  createUser(userInput: UserInput): User
  createProduct(productInput: ProductInput): Product
  getTask(taskOne : TaskOne) : Task
  createTask(taskInput: TaskInput): Task
  updateTask(taskUpdate: TaskUpdate): Task
  deleteTask(taskDelete: TaskDelete): Task
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);
