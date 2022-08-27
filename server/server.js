const path = require("path");
const express = require("express");
const { ApolloServer } = require('apollo-server-express');
const session = require("express-session");
const { authMiddleware } = require('./utils/auth');
const MongoDBStore = require('connect-mongodb-session')(session);

const routes = require("./routes");
const { typeDefs, resolvers } = require('./schemas');
const db = require("./config/connection");

const helpers = require("./utils/helpers");

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
});

const app = express();
const PORT = process.env.PORT || 3001;

// const http = require("http");
const { Server } = require("socket.io");
const io = new Server(server);

let users = {};
// on client socket connection
io.on("connection", (socket) => {
    // require socket.js; pass in io, socket, users
    require("./config/socket")(io, socket, users);
});

var sessionStore = new MongoDBStore({
    uri: 'mongodb://localhost:27017/developerDB',
    collection: 'mySessions'
});

sessionStore.on('error', function (error) {
    console.log(error);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// app.use(routes);

const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app });
    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        })
    })
};

startApolloServer(typeDefs, resolvers);