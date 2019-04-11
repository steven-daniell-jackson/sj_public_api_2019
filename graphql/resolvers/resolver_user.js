// https://www.npmjs.com/package/bcrypt
const bcrypt = require("bcryptjs");
// https://www.npmjs.com/package/jsonwebtoken
const jwt = require("jsonwebtoken");
const { dateToString } = require("../../helpers/date");
const User = require("../../models/model_user");

module.exports = {
  /* async createUser Mutation Function()
     Return all users
  */
  users: async () => {
    try {
      const users = await User.find();
      return users.map(user => {
        return {
          ...user._doc,
          _id: user.id,
          password: null, // Mask Password
          _createdAt: dateToString(user.createdAt)
        };
      });
    } catch (err) {
      throw err;
    }
  },
  createUser: async args => {
    try {
      /*    await(): Check if email address exists in collection 
            @Params: String @email
      */
      const existingUser = await User.findOne({ email: args.userInput.email });

      //  If User exists throw error
      if (existingUser) {
        throw new Error("User exists already.");
      }

      /*    await(): Hash password
            @Params: String @password
      */
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      // Create New User Instance with hashed password
      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
        firstName: args.userInput.firstName,
        lastName: args.userInput.lastName,
        age: +args.userInput.age,
        dateOfBirth: args.userInput.dateOfBirth,
        address: args.userInput.address,
        ethnicity: args.userInput.ethnicity,
        contactNumber: args.userInput.contactNumber,
        hobbies: args.userInput.hobbies,
        profileImg: args.userInput.profileImg,
        priviledges: args.userInput.priviledges,
        active: args.userInput.active
      });

      /*    await(): Update User Collection
            @Params: User @user
      */
      const result = await user.save();
      return {
        ...result._doc, // Return Internal Mongo User Doc
        password: null, // Mask Password
        _id: result.id, // Assign _id to (Mongo)result.id
        _createdAt: dateToString(result.createdAt) // Assign _createdAt to (Mongo)result.createdAt
      };
    } catch (err) {
      throw err;
    }
  },
  /*    async login Query Function()
        String @email
        String @password
  */
  login: async ({ email, password }) => {
    /*  await(): Find user in collection 
        @Params: String @email
    */
    const user = await User.findOne({ email: email });

    //  If User does not exist throw error
    if (!user) {
      throw new Error("User does not exist!");
    }

    /*  await(): Compare password to hashed password
        @Params: String @email
    */
    const isEqual = await bcrypt.compare(password, user.password);

    //  If password is not equal throw error
    if (!isEqual) {
      throw new Error("Password is incorrect!");
    }

    /*  Create token with jsonwebtoken
        @Params: 
        String @user.id
        String @user.email
        String process.env.SECRET_KEY
    */
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      `${process.env.SECRET_KEY}`,
      {
        expiresIn: "1h"
      }
    );
    return {
      userId: user.id,
      token: token,
      tokenExpiration: 1
    };
  }
};
