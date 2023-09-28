const mongoose = require('../database/connection');
const carSchema = new mongoose.Schema({
    Brand: String,
    Model: String,
    Year: String,
    Mileage: String,
});

const Car = mongoose.model('Car', carSchema)

module.exports = Car;