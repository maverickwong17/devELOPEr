const { gql } = require('apollo-server-express');

const typeDefs = gql`
    scalar Date

    type User {
        _id: ID
        email: String
        password: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Message{
        _id: ID
        username: String
        messageText: String
        createdAt: Date
    }
    
    type Query {
        users: [User]
        user(email: String!): User
        me: User
        messages: [Message]
    }

    type Mutation {
        addUser(email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;