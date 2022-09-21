/*
1. require express, cors, body-parser, and sequelize initialized, userRoutes and errorController.
2. initialize the app and make it use bodyparser for urlencoded and json responses both.
3. use sequelize.sync to sync the table and make the app listen to desired port.
*/

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./utils/database");

const userRoute = require("./routes/user");
const errorController = require("./controllers/404");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(userRoute);

app.use(errorController.get404);

sequelize
    .sync()
    .then(() => {
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });
