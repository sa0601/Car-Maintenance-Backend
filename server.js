require("dotenv").config()
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const cors = require("cors");
const session = require("express-session");
const bcrypt = require("bcrypt");
const userController = require('./controller/userController');
const carController = require('./controller/carController');
const serviceController = require("./controller/serviceController");
PORT = 3800;

//MIDDLEWARE
app.use(cors());
app.use(express.urlencoded({ extended: true})); 
app.use(session({ secret: 'somestringrandomdwd', cookie: {maxAge: 3600000 }}));
app.use(express.json()); //allows us to to create key/values in Postman in an object forman in the "raw" section - DOUBLE QUOTES MUST BE USED FOR JSON
app.use(express.static("public"));
app.use(methodOverride('_method'));

//INDEX
app.get("/", (req, res) => {
    res.send("Index Page? Hello?")
} )


app.use("/user", userController);
app.use("/car", carController);
app.use("/service", serviceController);




app.listen(PORT, (req, res) =>{
    console.log("Server is running on PORT " + PORT)
})