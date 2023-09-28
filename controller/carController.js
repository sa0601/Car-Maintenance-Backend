const express = require('express');
const router = express.Router();
const Car = require("../models/car");

//INDEX
router.get("/", async (req, res) => {
    try{
        res.json(await Car.find())
    }catch(error){
        res.status(400).json(error)
    }
});

//DELETE
router.delete('/:id', async (req, res) => {
    try{
        res.json(await Car.findByIdAndDelete(req.params.id));
    }catch(error){
        res.status(400).json(error);
    }
});

//UPDATE
router.put("/:id", async (req, res) => {
    try{
        res.json(await Car.findByIdAndUpdate(req.params.id, req.body, {new: true}));
    }catch(error){
        res.status(400).json(error);
    }
})


//CREATE
router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        res.json( await Car.create(req.body))
    } catch(error){
        res.status(400).json(error)
    }
})

//EDIT

//SHOW
router.get("/:id", async (req, res) => {
    try{
        res.json(await Car.findById(req.params.id));
    }catch(error){
        res.status(400).json(error)
    }
})


module.exports = router;