const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../models/user");
const Car = require("../models/car");

router.get('/', async (req, res) => {
    try {
        const newUsers = await User.find({});
        res.status(200).json(newUsers);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post("/login", async (req, res) => {
    console.log(req.body);

    let userToLogin = await User.findOne({ username: req.body.username });

    if (!userToLogin) {
        console.log("Username not found");
        return res.send("Username not found");
    } 

    bcrypt.compare(req.body.password, userToLogin.password, async (err, result) => {
        if (err) {
            console.error("Error during bcrypt comparison:", err);
            return res.status(500).send("Internal Server Error");
        }

        if (result) {
            req.session.username = userToLogin.username;
            req.session.email = userToLogin.email;
            req.session.user = userToLogin;

            const cars = await Car.find();
            return res.render("dashboard", { User: userToLogin, cars: cars });
        } else {
            console.log("Incorrect Password");
            return res.send("Incorrect Password");
        }
    });
});


router.post("/signup", async (req, res) => {
    console.log(req.body);

    if(req.body.username && req.body.password){
        let plainTextPassword = req.body.password
        bcrypt. hash(plainTextPassword, 10, async (err, hashedPassword) => {
            req.body.password = hashedPassword;
            let newUser = await User.create(req.body);
            res.redirect("/");
        })
    } else {
       res.send("You are missing a username or password");
    }
});

router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

router.get('/logout', (req, res) => {
    req.session.destroy(); 
    res.redirect('/'); 
});

module.exports = router;