const { AuthenticationError } = require("apollo-server-express");
const { User, Message } = require("../models");
const { signToken } = require("../utils/auth");
const { GraphQLScalarType, Kind } = require("graphql");

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

const resolvers = {
  Date: dateScalar,
  Query: {
    users: async () => {
      return User.find().populate("connections");
    },
    user: async (parent, { _id }) => {
      return User.findById( _id );
    },
    messages: async () => {
      return Message.find();
    },
    me: async (parent, args, context) => {
        console.log('me')
      if (context.user) {
        return await User.findOne({ _id: context.user._id })
          .populate("connections")
          .populate({ path: "connections", populate: { path: "profile" } });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, body) => {
      const email = body.email;
      const password = body.password;
      const user = await User.create({ email, password });
      const token = signToken(user);
      user.profile = body.input;
      await user.save();
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("No user found with this email");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      console.log(token);

      return { token, user };
    },
    addConnection: async (parent, body, context) => {
      // console.log('Hi')
      console.log("body", body);
      // console.log(context.user)
      if (context.user) {
        const partner = await User.findOne(body);
        console.log("partner", partner);

        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { connections: partner } },
          { new: true }
        );
        console.log("users", user);
        // console.log(usr.connections);
        // console.log(user.connections);
        return user;
      }
    },
  },
};

module.exports = resolvers;
