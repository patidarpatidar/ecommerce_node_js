const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:String,
    price:String,
    userId:String,
    category:String,
    company:String,
    mediaUrl:String
})

module.exports = mongoose.model("products",productSchema);