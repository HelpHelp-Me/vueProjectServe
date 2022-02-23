const mongoose = require('mongoose')
module.exports = mongoose.model('tag',{
    tagName: String
})