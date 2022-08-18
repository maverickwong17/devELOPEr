const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const MongoDBStore = require('connect-mongodb-session')(session);

const routes = require("./routes");
const db = require("./config/connection");
const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3001;

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let users = {};
// on client socket connection
io.on("connection", (socket) => {
    // require socket.js; pass in io, socket, users
    require("./config/socket")(io, socket, users);
});

var store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/developerDB',
    collection: 'mySessions'
});

store.on('error', function (error) {
    console.log(error);
});

const sess = {
    secret: "This is a secret",
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
    resave: true,
    saveUninitialized: true,
    store: store,
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

db.once('open', () => {
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}!`);
    });
});