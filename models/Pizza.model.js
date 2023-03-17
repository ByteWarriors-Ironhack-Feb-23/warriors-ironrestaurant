const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const pizzaSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 99,
        min: 10
    },
    ingredients: [String],
    isVeggie: {
        type: Boolean,
        default: false
    },
    dough: {
        type: String,
        enum: ["thin", "thick", "with cheese", "with garlic"],
    },
    imageFile: String
});

//create Model
const Pizza = mongoose.model("Pizza", pizzaSchema);


module.exports = Pizza;