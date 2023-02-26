const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: String,
})

module.exports = mongoose.model('Product', ProductSchema)